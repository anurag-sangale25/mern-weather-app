import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
