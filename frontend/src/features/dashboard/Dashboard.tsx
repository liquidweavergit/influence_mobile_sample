import OffersTable from "../offers/OffersTable";
import {Grid} from "@mui/material";
import React from "react";

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding={'20px'}
      sx={{ minHeight: '90vh' }}
    >
      <Grid item xs={3}>
        <OffersTable/>
      </Grid>
    </Grid>
  )
};

export default Dashboard;
