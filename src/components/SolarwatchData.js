import React from "react";
import {Card, CardContent, Typography} from '@mui/material';

const SolarwatchData = ({ data }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {data.city && (
                    <div>
                        <Typography variant="h6">City:</Typography>
                        <Typography variant="body1">{data.city}</Typography>
                    </div>
                )}
                {data.date && (
                    <div>
                        <Typography variant="h6">Date:</Typography>
                        <Typography variant="body1">{data.date}</Typography>
                    </div>
                )}
                {data.sunrise && (
                    <div>
                        <Typography variant="h6">Sunrise:</Typography>
                        <Typography variant="body1">{data.sunrise}</Typography>
                    </div>
                )}
                {data.sunset && (
                    <div>
                        <Typography variant="h6">Sunset:</Typography>
                        <Typography variant="body1">{data.sunset}</Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
export default SolarwatchData;