export const formats = {
  a0: ["84.1cm", "118.9cm"],
  a1: ["59.4cm", "84.1cm"],
  a2: ["42cm", "59.4cm"],
  a3: ["29.7cm", "42cm"],
  a4: ["21cm", "29.7cm"],
  a5: ["14.8cm", "21cm"],
  a6: ["10.5cm", "14.8cm"],
  a7: ["7.4cm", "10.5cm"],
  a8: ["5.2cm", "7.4cm"],
  a9: ["3.7cm", "5.2cm"],
  a10: ["2.6cm", "3.7cm"],

  // ISO B Series
  b0: ["100cm", "141.4cm"],
  b1: ["70.7cm", "100cm"],
  b2: ["50cm", "70.7cm"],
  b3: ["35.3cm", "50cm"],
  b4: ["25cm", "35.3cm"],
  b5: ["17.6cm", "25cm"],
  b6: ["12.5cm", "17.6cm"],
  b7: ["8.8cm", "12.5cm"],
  b8: ["6.2cm", "8.8cm"],
  b9: ["4.4cm", "6.2cm"],
  b10: ["3.1cm", "4.4cm"],

  // ISO C Series (Envelope sizes)
  c0: ["91.7cm", "129.7cm"],
  c1: ["64.8cm", "91.7cm"],
  c2: ["45.8cm", "64.8cm"],
  c3: ["32.4cm", "45.8cm"],
  c4: ["22.9cm", "32.4cm"],
  c5: ["16.2cm", "22.9cm"],
  c6: ["11.4cm", "16.2cm"],
  c7: ["8.1cm", "11.4cm"],
  c8: ["5.7cm", "8.1cm"],
  c9: ["4cm", "5.7cm"],
  c10: ["2.8cm", "4cm"],

  // North American Sizes
  letter: ["8.5in", "11in"],
  legal: ["8.5in", "14in"],
  ledger: ["11in", "17in"],
  tabloid: ["11in", "17in"],

  // Canadian Government Sizes
  p1: ["56cm", "86cm"],
  p2: ["43cm", "56cm"],
  p3: ["28cm", "43cm"],
  p4: ["21.5cm", "28cm"],
  p5: ["14cm", "21.5cm"],

  // Japanese JIS B Series
  "jis-b0": ["103cm", "145.6cm"],
  "jis-b1": ["72.8cm", "103cm"],
  "jis-b2": ["51.5cm", "72.8cm"],
  "jis-b3": ["36.4cm", "51.5cm"],
  "jis-b4": ["25.7cm", "36.4cm"],
  "jis-b5": ["18.2cm", "25.7cm"],
  "jis-b6": ["12.8cm", "18.2cm"],
  "jis-b7": ["9.1cm", "12.8cm"],
  "jis-b8": ["6.4cm", "9.1cm"],
  "jis-b9": ["4.5cm", "6.4cm"],
  "jis-b10": ["3.2cm", "4.5cm"],

  // China D Series
  d0: ["77.1cm", "109cm"],
  d1: ["54.5cm", "77.1cm"],
  d2: ["38.5cm", "54.5cm"],
  d3: ["27.2cm", "38.5cm"],
  d4: ["19.2cm", "27.2cm"],
  d5: ["13.6cm", "19.2cm"],
  d6: ["9.6cm", "13.6cm"],

  // Photographic Print Sizes
  "4r": ["4in", "6in"],
  "5r": ["5in", "7in"],
  "8r": ["8in", "10in"],
  "10r": ["10in", "12in"],
  "11r": ["11in", "14in"],
  "12r": ["12in", "15in"],

  // Archival Series (US)
  "arch-A": ["9in", "12in"],
  "arch-B": ["12in", "18in"],
  "arch-C": ["18in", "24in"],
  "arch-D": ["24in", "36in"],
  "arch-E": ["36in", "48in"],
  "arch-E1": ["30in", "42in"],

  // Newspaper Sizes
  broadsheet: ["60cm", "75cm"],
  berliner: ["31.5cm", "47cm"],
};

export type Format = keyof typeof formats;
