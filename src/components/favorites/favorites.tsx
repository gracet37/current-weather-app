import React from 'react';
import { SortType } from '../../types/enum';
import { Box, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { resultsSorter } from '../../utils/sorter.util';

type FavoritesProps = {
    favorites: string[];
    setFavorites: (data: string[]) => void;
    handleDataChange: (data: string) => void;
};

export const Favorites: React.FC<FavoritesProps> = ({
    favorites,
    setFavorites,
    handleDataChange
}) => {
    const [sort, setSort] = React.useState(SortType.ASC);

    const removeFromFavorites = (name: string) => {
        const updatedFavorites = favorites.filter(
            (favorite) => favorite !== name
        );
        setFavorites(updatedFavorites);
    };

    const sortedArray = React.useMemo(() => {
        return resultsSorter(favorites, sort);
    }, [sort, favorites]);

    return (
        <Box
            marginY="50px"
            padding="50px"
            sx={{ border: '1px solid grey', borderRadius: '3px' }}
        >
            <Box
                onClick={() => {
                    setSort(
                        sort === SortType.ASC ? SortType.DESC : SortType.ASC
                    );
                    resultsSorter(favorites, sort);
                }}
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: 35,
                        marginBottom: '60px',
                        marginRight: '20px'
                    }}
                >
                    Favorited cities:
                </Typography>
                {sort === SortType.ASC ? (
                    <ArrowUpwardIcon
                        aria-label="sort ascending"
                        sx={{ fontSize: 35 }}
                    />
                ) : (
                    <ArrowDownwardIcon
                        aria-label="sort descending"
                        sx={{ fontSize: 35 }}
                    />
                )}
            </Box>
            {sortedArray.length > 0 ? (
                sortedArray.map((favorite, i) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                marginBottom: '20px',
                                cursor: 'pointer'
                            }}
                            key={i}
                        >
                            <Box onClick={() => handleDataChange(favorite)}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: 24 }}
                                >
                                    {favorite}
                                </Typography>
                            </Box>
                            <Box onClick={() => removeFromFavorites(favorite)}>
                                <RemoveCircleOutlineIcon
                                    sx={{
                                        fontSize: 35,
                                        marginLeft: '20px'
                                    }}
                                />
                            </Box>
                        </Box>
                    );
                })
            ) : (
                <Typography variant="body1" sx={{ color: '#919191' }}>
                    You do not have any saved cities
                </Typography>
            )}
        </Box>
    );
};
