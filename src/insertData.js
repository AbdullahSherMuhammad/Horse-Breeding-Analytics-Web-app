const { supabase } = require("../config/supabase");

const insertDataToSupabase = async (data) => {
  try {
    const horseRecord = {
      feif_id: data.basic_info["FEIF ID"],
      name: data.basic_info.Name,
      date_of_birth: changeDateFormat(data.basic_info["Date of birth"]),
      gender: data.basic_info.Gender,
      colour_code: data.basic_info["Colour code"],
      colour_description: data.basic_info["Colour Description"],
      country_of_location: data.basic_info["Country of current location"],
      inbreeding_coefficient:
        parseFloat(data.blup_info["Inbreeding coefficient (%)"]) || null,
      sire_feif_id: data.basic_info.Sire
        ? data.basic_info.Sire.split(" - ")[0]
        : null, // Extract sire FEIF ID
      dam_feif_id: data.basic_info.Dam
        ? data.basic_info.Dam.split(" - ")[0]
        : null, // Extract dam FEIF ID
      raw_json: data,
      created_at: new Date().toISOString(), // Optional: if Supabase doesn't auto-populate
      updated_at: new Date().toISOString(), // Optional: if Supabase doesn't auto-populate
    };

    const { error } = await supabase.from("horses").insert([horseRecord]);

    if (error) {
      console.error("Error inserting data into Supabase:", error.message);
    } else {
      console.log(
        `Data for FEIF ID ${data.basic_info["FEIF ID"]} inserted successfully.`
      );
    }
  } catch (err) {
    console.error("Unexpected error inserting data:", err.message);
  }
};

module.exports = insertDataToSupabase;


// We were having an issue with date, as Postegre takes in different format so this function resolve that issue.
const changeDateFormat = (inputDate) => {
  const [day, month, year] = inputDate.split('.');
  // Return the date in yyyy-mm-dd format
  return `${month}-${day}-${year}`;
};