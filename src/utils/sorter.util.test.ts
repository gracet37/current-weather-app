import { resultsSorter } from './sorter.util';
import { SortType } from '../types/enum';

const mockData: string[] = ['Auckland', 'Shanghai', 'New York']

describe('results sort', () => {
  test('sorts city name by ascending order', () => {
    const sort = SortType.ASC;
    const sortedResults = resultsSorter(mockData, sort);
    const firstResult = sortedResults[0]
    expect(firstResult).toEqual('Auckland');
  });
  test('sorts city name by descending order', () => {
    const sort = SortType.DESC;
    const sortedResults = resultsSorter(mockData, sort);
    const firstResult = sortedResults[0]
    expect(firstResult).toEqual('Shanghai');
  });
});