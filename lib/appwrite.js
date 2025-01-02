import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.personal.aora",
  projectId: "67763f72003d8dfa43f1",
  databaseId: "6776405a002b18366b3a",
  userCollectionid: "677640710025ebff633c",
  videoCollectionid: "67764089003cf5e30170",
  storageId: "677641ac001810e61a25",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
  .setProject(Config.projectId) // Your project ID
  .setPlatform(Config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account not created");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionid,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// Register User

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
