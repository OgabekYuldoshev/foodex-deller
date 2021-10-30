export default (context, inject) => {
    const factories = {
      url: 'https://foodexx.herokuapp.com/',
    };

    inject("constants", factories);
  };
  