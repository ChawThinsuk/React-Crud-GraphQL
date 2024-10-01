import { gql } from "@apollo/client";

export const GET_CATEGORY_SUBLEVEL1_WITH_SUB2 = gql`
  query {
    getAllCategories {
      id
      name
      desc
      categorySublevel2 {
        id
        name
        desc
      }
    }
  }
`;
export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      id
      name
      itemImg
      desc
      amount
      price
      costPrice
    }
  }
`;
export const GET_ITEM_BY_NAME = gql`
  query GetItemByName($name: String!) {
    getItemByName(name: $name) {
      id
      name
      itemImg
      desc
      amount
      price
      costPrice
    }
  }
`;
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      desc
      categorySublevel2 {
        id
        name
        desc
      }
    }
  }
`;
