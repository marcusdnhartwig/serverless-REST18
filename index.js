'use strict';

import { DynamoDBClient, ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "us-west-2";
const ddbClient = new DynamoDBClient({ region: REGION });
const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false,
};
const unmarshallOptions = {
    wrapNumbers: false,
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export const handler = async ({ primaryKeyId, tableName, action, data }) => {
    let params = {};
    if (action === 'select') {
        params = {
            Statement: "SELECT * FROM " + tableName + " where id=?",
            Parameters: [{ S: primaryKeyId }],
        };
    } else if (action === 'insert') {
        params = {
            Statement: "INSERT INTO " + tableName + "  value  {'id':?, 'first': ?}",
            Parameters: [{ S: data }, {S: primaryKeyId}],
        };
    } else if (action === 'update') {
        params = {
            Statement: "UPDATE " + tableName + " SET first=? where first=?",
            Parameters: [{ S: primaryKeyId }, { S: data }],
          };
    } else if(action === 'delete'){
        params = {
            Statement: "DELETE FROM " + tableName + " where id=?",
            Parameters: [{ S: primaryKeyId }],
          };
    }
    try {
        if (!Object.keys(params).length) {
            throw new Error(`Incorrect Action item was provided, please provide a supported action item and try again`);
        }
        console.log(params);
        const response = await ddbDocClient.send(new ExecuteStatementCommand(params));
        console.log('Response ', response);
        console.log('Response User ', response.Items);

    } catch (error) {
        console.log("Error", error);
    }

}