import { createSlice } from "@reduxjs/toolkit";

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface AdsState {
  ads: Ad[];
  filteredAds: Ad[];
  selectedAd: Ad | null;
}

const initialState: AdsState = {
  ads: [],
  filteredAds: [],
  selectedAd: null,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
      state.filteredAds = action.payload;
    },
    setSelectedAd: (state, action) => {
      state.selectedAd = action.payload;
    },
    filterAds: (state, action) => {
      const { category, searchTerm } = action.payload;
      state.filteredAds = state.ads.filter(
        (ad) =>
          (!category || ad.category === category) &&
          (!searchTerm || ad.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    },
  },
});

export const { setAds, setSelectedAd, filterAds } = adsSlice.actions;
export default adsSlice.reducer;
