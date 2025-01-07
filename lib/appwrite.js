import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.personal.aora",
  projectId: "67763f72003d8dfa43f1",
  databaseId: "6776405a002b18366b3a",
  userCollectionId: "677640710025ebff633c",
  videoCollectionId: "67779b6b001b446891fb",
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

// Create User

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
      Config.userCollectionId,
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

// User login

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");

    const currentUser = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("User not found");
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getAllPost = async () => {
  try {
    if (!Config.databaseId || !Config.videoCollectionId) {
      throw new Error("Database or Collection ID is missing");
    }

    const post = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId
    );

    if (!post || !post.documents) {
      throw new Error("No documents found");
    }

    return post.documents;
  } catch (error) {
    console.error("getAllPost error:", error);
    throw error; // Re-throw the error so we can handle it in the component
  }
};

export const getLatestPost = async () => {
  try {
    if (!Config.databaseId || !Config.videoCollectionId) {
      throw new Error("Database or Collection ID is missing");
    }

    const post = await databases.listDocuments(
      Config.databaseId,
      Config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return post.documents;
  } catch (error) {
    console.error("getAllPost error:", error);
    throw error; // Re-throw the error so we can handle it in the component
  }
};
