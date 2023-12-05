import create from "zustand";
import {Offer, BACKEND_BASE_URL} from "../types/offer";
import axios from "axios";

type OfferStore = {
  loading: boolean;
  errors: string[];
  getAccessToken: () => string | null;
  offers: Offer[];
  selectedOffer: Offer | null;
  fetchOffers: () => void;
};

const offerStore = create<OfferStore>((set, get) => ({
  loading: false,
  errors: [],
  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },
  offers: [],
  selectedOffer: null,
  fetchOffers: async () => {
    set({
      loading: true,
      offers: []
    });

    let response;

    try {
      response = await axios.get(`${BACKEND_BASE_URL}/offers.json`,
        {
          headers: {
            "authorization": `Bearer ${get().getAccessToken()}`,
          }
        });
    } catch (e) {
      set({
        loading: false,
        errors: ["Please login"]
      });

      localStorage.removeItem('accessToken');

      return;
    }

    set({
      loading: false,
      offers: response.data,
    });
  },
}));

export default offerStore;