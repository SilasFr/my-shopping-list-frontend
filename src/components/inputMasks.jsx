function currency(e) {
  let value = e.target.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  e.target.innerHTML = value;
  return e;
}

const inputMask = {
  currency,
};

export default inputMask;
