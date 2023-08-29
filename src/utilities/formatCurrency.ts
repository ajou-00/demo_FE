const CURRENCY_FORMATTER = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
