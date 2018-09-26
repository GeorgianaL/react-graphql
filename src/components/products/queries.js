import { gql } from "apollo-boost";

export const getProductsQuery = gql`
  {
    products {
      id
      brand
      model
      fuel
      engine
      gearbox
      color
      year
      km
      price
      thumbnailUrl
    }
  }
`;

export const getPropsName = gql`
  query($brandId: Int!, $modelId: Int!, $fuelTypeId: Int!, $engineTypeId: Int!, $gearboxId: Int!, $colorId: Int!) {
    getBrand(id: $brandId) {
      id
      type
    }
    getModel(id: $modelId) {
      id
      type
    }
    getFuelType(id: $fuelTypeId) {
      id
      type
    }
    getEngineType(id: $engineTypeId) {
      id
      type
    }
    getGearbox(id: $gearboxId) {
      id
      type
    }
    getColor(id: $colorId) {
      id
      type
    }
  }
`;
