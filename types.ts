import { RouteProp } from "@react-navigation/native";

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
export type UltraPosition = number | "G" | "D" | "M" | "A";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: UltraPosition;
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
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: UltraPosition;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
  pictureUrl: string;
};

export type DetailPlayerComponentProps = {
  player: PlayerDetail;
};

export type PlayerDetailScreenProps = {
  route: RouteProp<RootStackParamList, "PlayerDetail">;
};

export type PlayerCardProps = {
  player: Player;
  clubs: Club[];
  players: Player[];
  onPress: () => void;
};
