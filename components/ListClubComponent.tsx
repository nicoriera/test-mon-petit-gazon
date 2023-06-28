import axios from "axios";
import React from "react";

interface Club {
  id: string;
  name: { [key: string]: string };
}

interface ListClubComponentState {
  clubs: Club[];
  selectedClub: string | null;
}

export default class ListClubComponent extends React.Component<
  {},
  ListClubComponentState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clubs: [],
      selectedClub: null,
    };
  }

  getClubs = async () => {
    try {
      const response = await axios.get<{
        championshipClubs: Record<string, Club>;
      }>("https://api.mpg.football/api/data/championship-clubs");
      const clubs = Object.values(response.data.championshipClubs);
      console.log(clubs);
      this.setState({ clubs });
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici
    }
  };

  componentDidMount() {
    this.getClubs();
  }

  handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClub = event.target.value;
    this.setState({ selectedClub });
  };

  render() {
    const { clubs, selectedClub } = this.state;

    return (
      <div>
        <label htmlFor="clubSelect">Sélectionnez un club :</label>
        <select
          id="clubSelect"
          value={selectedClub || ""}
          onChange={this.handleClubChange}
        >
          <option value="">-- Sélectionner --</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name["fr-FR"]}
            </option>
          ))}
        </select>
        {selectedClub && <p>Club sélectionné : {selectedClub}</p>}
      </div>
    );
  }
}
