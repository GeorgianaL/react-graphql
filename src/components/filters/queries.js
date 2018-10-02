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
      brandId
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

export const getPricesQuery = gql`
  {
    products {
      id
      price
    }
  }
`;

export const getKmQuery = gql`
  {
    products {
      id
      km
    }
  }
`;

export const getYearQuery = gql`
  {
    products {
      id
      year
    }
  }
`;
