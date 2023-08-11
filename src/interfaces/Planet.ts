interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
}

export interface PlanetRaw extends Planet {
  residents: string[];
  created: string;
  edited: string;
  url: string;
}

export default Planet;
