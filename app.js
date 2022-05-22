let data;

fetch("./Data.json")
  .then((res) => {
    return res.json();
  })
  .then((Data) => {
    data = Data;
    console.log(data);
  })
  .catch((error) => {
    console.log("Unable to fetch the data");
  });
