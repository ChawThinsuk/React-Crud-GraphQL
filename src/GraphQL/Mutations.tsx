import { gql } from '@apollo/client';

// Mutation สำหรับสร้าง item ใหม่
export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      categoryId
      itemImg
      desc
      amount
      price
      costPrice
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: Int!, $data: UpdateItemInput!) {
    updateItem(id: $id, data: $data) {
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

export const DELETE_ITEM = gql`
    mutation DeleteItem($id: Int!) {
        deleteItem(id: $id) {
            id
            name
        }
    }
`;

export const CREATE_CATEGORY_SUBLEVEL1 = gql`
    mutation CreateCategorySublevel1($input: CreateCategorySublevel1Input!) {
        createCategorySublevel1(input: $input) {
            name
            desc
            categorySublevel2 {
                name
                desc
            }
        }
    }
`;