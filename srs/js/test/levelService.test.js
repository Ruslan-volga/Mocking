import { getLevel } from '../levelService';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('getLevel function', () => {
    test('should return level for successful response', () => {
        fetchData.mockReturnValueOnce({
            status: 'ok',
            level: 42
        });

        const result = getLevel(1);
        expect(fetchData).toHaveBeenCalledWith('https://server/user/1');
        expect(result).toBe('Ваш текущий уровень: 42');
    });

    test('should return unavailable message for error response', () => {
        fetchData.mockReturnValueOnce({
            status: 'error'
        });

        const result = getLevel(2);
        expect(result).toBe('Информация об уровне временно недоступна');
    });

    test('should handle fetch errors', () => {
        fetchData.mockImplementationOnce(() => {
            throw new Error('Network error');
        });

        const result = getLevel(3);
        expect(result).toBe('Информация об уровне временно недоступна');
    });
});