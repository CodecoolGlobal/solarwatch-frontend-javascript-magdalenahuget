import React from "react";
import {Box, Typography} from '@mui/material';

const SolarwatchData = ({data}) => {
    return (
        <Box mt={2}>
            {data.city && (
                <Box>
                    <Typography variant="h6">City:</Typography>
                    <Typography variant="body1">{data.city}</Typography>
                </Box>
            )}
            {data.date && (
                <Box>
                    <Typography variant="h6">Date:</Typography>
                    <Typography variant="body1">{data.date}</Typography>
                </Box>
            )}
            {data.sunrise && (
                <Box>
                    <Typography variant="h6">Sunrise:</Typography>
                    <Typography variant="body1">{data.sunrise}</Typography>
                </Box>
            )}
            {data.sunset && (
                <Box>
                    <Typography variant="h6">Sunset:</Typography>
                    <Typography variant="body1">{data.sunset}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default SolarwatchData;