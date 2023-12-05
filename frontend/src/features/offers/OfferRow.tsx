import React, {Fragment} from "react";
import {Offer} from "../../types/offer";
import {TableCell, TableRow} from "@mui/material";

interface OffersProps {
  offer: Offer;
}

const OfferRow: React.FC<OffersProps> = ({offer}) => {
  return (
    <Fragment>
      <TableRow>
        <TableCell>{offer.title}</TableCell>
        <TableCell>{offer.description}</TableCell>
        <TableCell align="right">{offer.min_age + '-' + offer.max_age}</TableCell>
        <TableCell align="right">{offer.gender}</TableCell>
        <TableCell align="right">{offer.expiration_date.toString()}</TableCell>
      </TableRow>
    </Fragment>
  )
};

export default OfferRow;