import { SortType } from "../types/enum";

export const resultsSorter = (favorites: string[], sort: string): string[] => {
    if (sort === SortType.ASC) {
        return favorites.sort()
    } else {
        return favorites.sort((a,b) => {
            const aName = a;
            const bName = b;

            if (aName < bName) {
                return 1
            }

            if (aName > bName) {
                return -1
            }

            return 0
        })
    }
}