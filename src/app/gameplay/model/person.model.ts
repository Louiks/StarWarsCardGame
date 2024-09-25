export type PersonDTO = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

export type PersonRequest = {
  message: string;
  result: {
    description: string;
    properties: PersonDTO;
  }
}

export type Person = Pick<PersonDTO, 'name'> & {
  BMI: number;
  height: number;
  mass: number;
};

export type CalculationBase = keyof Person;
