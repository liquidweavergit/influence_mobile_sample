import React, {Fragment, useEffect} from "react";
import offerStore from "../../stores/offerStore";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import OfferRow from "./OfferRow";
import {useNavigate} from "react-router-dom";
import userStore from "../../stores/userStore";

interface OffersProps {

}

const OffersTable: React.FC<OffersProps> = () => {
  const fetchOffers = offerStore((state) => state.fetchOffers);
  const offers = offerStore((state) => state.offers);
  const getAccessToken = userStore((state) => state.getAccessToken);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{width: '10%'}}>
              Title
            </TableCell>
            <TableCell style={{width: '50%'}}>
              Description
            </TableCell>
            <TableCell align="right" style={{width: '10%'}}>
              Age Range
            </TableCell>
            <TableCell align="right" style={{width: '10%'}}>
              Gender
            </TableCell>
            <TableCell align="right" style={{width: '10%'}}>
              Expires
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default OffersTable;