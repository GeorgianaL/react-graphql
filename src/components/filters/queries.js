import { gql } from "apollo-boost";

export const getFiltersQuery = gql`
  {
    filters {
      id
      type
    }
  }
`;

export const getBrandsQuery = gql`
  {
    brands {
      id
      type
    }
  }
`;

export const getModelsQuery = gql`
  {
    models {
      id
      type
    }
  }
`;

export const getFuelTypesQuery = gql`
  {
    fuelTypes {
      id
      type
    }
  }
`;

export const getEngineTypesQuery = gql`
  {
    engineTypes {
      id
      type
    }
  }
`;

export const getGearboxesQuery = gql`
  {
    gearboxes {
      id
      type
    }
  }
`;

export const getColorsQuery = gql`
  {
    colors {
      id
      type
    }
  }
`;
