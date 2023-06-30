export const getPlayerPosition = (ultraPosition: number) => {
  switch (ultraPosition) {
    case 10:
      return "Gardien - G";
    case 20:
      return "Défenseur - D";
    case 21:
      return "Latéral - L";
    case 30:
      return "Milieu défensif - MD";
    case 31:
      return "Milieu offensif - MO";
    case 40:
      return "Attaquant - A";
    default:
      return "";
  }
};
