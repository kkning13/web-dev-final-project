/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  collection,
  addDoc,
  // getDocs,
  // doc,
  // deleteDoc, // preferred in latest versions of firebase
  // updateDoc, // preferred in new versions of firebase
} from "firebase/firestore";
import { db } from "./firebase";
// import { Song } from "./types";
import { SONGS } from "./data/songs";

export const initialaddAllSongs = async (): Promise<{
  id: string | null; // last inserted song's ID
  addedCount: number;
}> => {
  try {
    const songsCollection = collection(db, "songs");

    let count: number = 0;
    let lastInsertedId: string | null = null;

    for (const song of SONGS) {
      const docRef = await addDoc(songsCollection, song);
      lastInsertedId = docRef.id;
      count++;
    }
    return {
      id: lastInsertedId,
      addedCount: count,
    };
  } catch (e) {
    console.error("Error adding all songs", e);
    return {
      id: null,
      addedCount: 0,
    }
  }
}

// // Get all semesters and their courses
// export const fetchAllSemesters = async (): Promise<
//   {
//     name: string;
//     id: string;
//   }[]
// > => {
//   try {
//     const collectionRef = collection(db, "semester");
//     const docRef = await getDocs(collectionRef);
//     return docRef.docs.map(doc => ({
//       id: doc.id,
//       name: doc.data().name,
//     }));
//   } catch (e) {
//     console.error("Error fetching semesters", e);
//     return [];
//   }
// };

// // Add a new semester
// export const addSemester = async (name: string): Promise<string | null> => {
//   try {
//     const docRef = await addDoc(collection(db, "semesters"), {name});
//     return docRef.id;
//   } catch (e) {
//     console.error("Error adding semester:", e);
//     return null;
//   }
// };

// // Get all courses for a semester
// export const fetchCoursesForSemester = async (
//   semesterId: string
// ): Promise<Song[]> => {
//   return [];
// };

// // Add a course to a semester
// export const addCourseToSemester = async (
//   semesterId: string,
//   course: Song
// ): Promise<string | null> => {
//   try {
//     const docRef = await addDoc(collection(db, 
//       `semesters/${semesterId}/courses`),
//       course
//     );
//     return docRef.id;
//   } catch (e) {
//     return null;
//   }
// };

// // Delete a course from a semester
// export const deleteCourseFromSemester = async (
//   semesterId: string,
//   courseId: string
// ): Promise<boolean> => {
//   return false;
// };

// // Update course notes
// export const updateCourseNotes = async (
//   semesterId: string,
//   courseId: string,
//   notes: string
// ): Promise<boolean> => {
//   return false;
// };

// // Update course details to show or hide
// export const updateCourseDetails = async (
//   semesterId: string,
//   courseId: string,
//   showDetails: boolean
// ): Promise<boolean> => {
//   return false;
// };

// // Add a course to the courses collection
// export const addCourseToDB = async (course: any): Promise<string | null> => {
//   try {
//     const coursesCollection = collection(db, "courses");
//     const docRef = await addDoc(coursesCollection, course);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding course to DB:", error);
//     return null;
//   }
// };

// // Get all courses from the courses collection
// export const fetchAllCourses = async (): Promise<Partial<Song>[]> => {
//   try {
//     const coursesCollection = collection(db, "courses");
//     const querySnapshot = await getDocs(coursesCollection);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Partial<Song>[];
//   } catch (error) {
//     console.error("Error fetching all courses:", error);
//     return [];
//   }
// };
