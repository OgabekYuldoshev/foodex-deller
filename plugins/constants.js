export default (context, inject) => {
  const factories = {
    url: "https://foodexx.herokuapp.com/",
    notification: (arr, type) => {
      switch (type) {
        case "check":
          return arr.some((o) => o.show === false);
          break;

        case "length":
          let found = arr.filter((o) => o.show === false);
          return found.length;
          break;

        default:
          break;
      }
    },
    normalizer: (str, chunk = 3) => {
      if (str === 0 || str === "0") {
        return str;
      }
      if (!str) {
        return "";
      }
      if (typeof str !== "string") {
        str = String(str);
      }

      //* Localization check
      if (str.indexOf(".") !== -1) {
        //* Seperate decimal and inregral parts
        let [decimalPart, integralPart] = str.split(".");

        //* Make it easy to append to the result
        let reverseDecimal = decimalPart.split("").reverse().join("");

        //* Result to store
        let result = "";
        for (let i = 0; i < reverseDecimal.length; i += chunk) {
          //* Append three digits
          result += reverseDecimal.slice(i, i + chunk);

          //* Append seperating space only if it is not last chunk
          if (i + chunk < reverseDecimal.length) result += " ";
        }

        //* The `.` has been removed so we add it
        return (
          result.split("").reverse().join("") +
          "." +
          integralPart.substring(0, 2)
        );
      } else {
        let reverseDecimal = str.split("").reverse().join("");

        //* Result to store
        let result = "";
        for (let i = 0; i < reverseDecimal.length; i += chunk) {
          //* Apped three digits
          result += reverseDecimal.slice(i, i + chunk);

          //* Append seperating space only if it is not last chunk
          if (i + chunk < reverseDecimal.length) result += " ";
        }

        return result.split("").reverse().join("");
      }
    },
  };

  inject("constants", factories);
};
