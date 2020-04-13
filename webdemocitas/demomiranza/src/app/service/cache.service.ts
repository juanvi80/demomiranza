import { Inject } from '@angular/core';


import { Observable, of } from 'rxjs';



class CacheElement <T> {
    public timestamp: number;
    public value: T;
}

export class CacheLocalStorageResponse {
    apiMaxCachedTime: number = 1000 * 60 * 60 * 3;
    private static LOCAL_STORAGE_KEYS_SAVED = 'miranzaalocalStorageCacheKeys';
    static CACHE_MAESTROS_PACIENTE_SEL = 'MPACIENTESEL';
    static CACHE_MAESTROS_CENTRO = 'MCENTROS';
    static CACHE_MAESTROS_PACIENTES = 'MPACIENTE';
    static CACHE_MAESTROS_CITAS = 'MCITAS';


    private cacheName: string;
    constructor(cacheName: string) {
        this.cacheName = cacheName;
        if (this.getOwnCache() == null) {
            localStorage.setItem(this.cacheName, JSON.stringify({}));
        }
        CacheLocalStorageResponse.appendNameToCache(cacheName);
    }
    public static clearCache(key: string) {
        const tempCache = CacheLocalStorageResponse.getCache(key);
        if (tempCache) {
            localStorage.removeItem(key);
        }
    }

    public static clearCaches() {

        this.clearCache(this.CACHE_MAESTROS_PACIENTE_SEL);
        this.clearCache(this.CACHE_MAESTROS_CENTRO);
        this.clearCache(this.CACHE_MAESTROS_CITAS);
        this.clearCache(this.CACHE_MAESTROS_PACIENTES);


        const globalCacheKeys: any = CacheLocalStorageResponse.getCache(CacheLocalStorageResponse.LOCAL_STORAGE_KEYS_SAVED);
        if (globalCacheKeys && globalCacheKeys.keys && globalCacheKeys.keys.length > 0) {
            globalCacheKeys.keys.forEach((cacheNameToRemove: string) => {
                const tempCache = CacheLocalStorageResponse.getCache(cacheNameToRemove);
                if (tempCache) {
                    localStorage.removeItem(cacheNameToRemove);
                }
            });
        }
    }

    private static appendNameToCache(cacheName: string) {
        let  globalCacheKeys: any = CacheLocalStorageResponse.getCache(CacheLocalStorageResponse.LOCAL_STORAGE_KEYS_SAVED);
        if (!globalCacheKeys || !globalCacheKeys.keys || !globalCacheKeys.keys.length) {
            globalCacheKeys = { keys: [] };
        }
        if (!globalCacheKeys.keys.includes(cacheName)) {
            globalCacheKeys.keys.push(cacheName);
        }
        CacheLocalStorageResponse.saveCache(CacheLocalStorageResponse.LOCAL_STORAGE_KEYS_SAVED, JSON.stringify(globalCacheKeys));
    }

    public static getCache(cacheName: string): any {
        let toReturn: any = null;
        const cacheItemString: string = localStorage.getItem(cacheName);
        if (cacheItemString) {
            try {
                toReturn = JSON.parse(cacheItemString);
            } catch (error) {
                /*LocalStorageQuproLogger.getLogger().error(
                    '[getCache] Error (Exception)', error);
                LocalStorageQuproLogger.getLogger().error('[getCache] Corrupted cache name: ' +
                              cacheName + '. Proceed to clean it.');*/
                localStorage.setItem(cacheName, JSON.stringify({}));
            }
        }
        return toReturn;
    }

    public static saveCache(cacheKey: string, cacheValue: string) {
        localStorage.setItem(cacheKey, cacheValue);
    }

    public getResponse<T>(cacheKey: string, getValueFromService: () => Observable<T>): Observable<T> {
        const cacheResponse: T = this.getResponseFromCache<T>(cacheKey);
        if (!cacheResponse || cacheResponse == null) {
            const observable: Observable<T> = getValueFromService();
            observable.subscribe((value: T) => {
                const cacheElem: CacheElement<T> = {
                    timestamp: Date.now(),
                    value,
                };
                this.saveResponse<T>(cacheKey, cacheElem);
            });
            return observable;
        }
        return of(cacheResponse);
    }

    private saveResponse<T>(cacheKey: string, quproResponse: CacheElement<T>) {
        let cache: any = this.getOwnCache();
        if (!cache) { cache = {}; }
        cache[cacheKey] = quproResponse;
        this.saveOwnCache(cache);
    }

    private getResponseFromCache<T>(cacheKey: string): T {
        let toReturn: T = null;
        const cache: any = this.getOwnCache();
        if (cache) {
            const cacheObj: CacheElement<T> = cache[cacheKey];
            if (cacheObj) {
                const timeDiff: number = Date.now() - cacheObj.timestamp;
                if (timeDiff <= this.apiMaxCachedTime) {
                    toReturn = cacheObj.value;
                }
            }
        }
        return toReturn;
    }

    private getOwnCache(): any {
        return CacheLocalStorageResponse.getCache(this.cacheName);
    }

    private saveOwnCache(cache: any) {
        CacheLocalStorageResponse.saveCache(this.cacheName, JSON.stringify(cache));
    }
}
