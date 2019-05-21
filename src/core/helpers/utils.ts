import pickKeys from 'json-pick-keys';

export class Utils {
    public static pickKeys<T = any>(obj: T, spaceSeparatedKeys: string) {
        return pickKeys(obj, spaceSeparatedKeys) as T;
    }
}
