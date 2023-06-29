export type RootStackParamList = {
  Home: undefined;
  PlayerDetail: { playerId: string };
};

export type Club = {
  championships: {
    [key: number]: {
      jerseys: {
        [key: number]: string;
      };
      active: boolean;
    };
  };
  id: string;
  name: {
    "fr-FR": string;
    "en-GB": string;
    "es-ES": string;
  };
  shortName: string;
  defaultJerseyUrl: string;
  defaultAssets: null;
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
};

export type PlayerDetail = {
  id: string;
  name: string;
  stats: any; // Replace "any" with the appropriate data structure for player statistics
};
export type DetailPlayerComponentProps = {
  player: PlayerDetail;
};

export type PlayerDetailScreenProps = {
  route: any; // Remplacez "any" par le type approprié pour le paramètre de navigation
};

export type PlayerCardProps = {
  player: Player;
  clubs: Club[];
  players: Player[];
};
