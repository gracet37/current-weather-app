import { WeatherData } from "../types";
import { SortType } from "../types/enum";

export const resultsSorter = (favorites: WeatherData[], sort: string): WeatherData[] => {
    if (sort === SortType.ASC) {
        return favorites.sort((a,b) => {
            const aName = a.name;
            const bName = b.name;

            if (aName > bName) {
                return 1
            }

            if (aName < bName) {
                return -1
            }

            return 0
        })
    } else {
        return favorites.sort((a,b) => {
            const aName = a.name;
            const bName = b.name;

            if (aName > bName) {
                return -1
            }

            if (aName < bName) {
                return 1
            }

            return 0
        })
    }
}