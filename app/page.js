'use client' // to make this a client-sided app
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { async } from "@firebase/util";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]) //state var used to store inventory
  const [open, setOpen] = useState(false) // state var used to add/remove 
  const [itemName, setItemName] = useState('') // used to store name of item

  // async means it wont block our code when fetching
  // blocking code when fetching means the entire website freezes when fetching
  const updateInventory = async () => {
    // collection
    const snapshot = query(collection(firestore, 'inventory'))
    //document
    const docs = await getDocs(snapshot)
    const inventoryList = []
    // for every element in docs, add to inventoryList
    docs.forEach((doc) =>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    // if snap exists, increment quantity by 1
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else { // doesnt exist so set quantity to 1
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    // get document reference if it exists
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()) {
      const {quantity} = docSnap.data()

      // if quantity is only 1, delete the doc
      if (quantity == 1) {
        await deleteDoc(docRef)
      }
      // if there are multiple just decrease the quantity by 1
      else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }
  // runs the code everytime the dependency array changes
  useEffect(() => {
    updateInventory()
  }, [])
  return <Box>
    <Typography variant="h1"> Inventory Management </Typography>
    {
      inventory.forEach((item) => {
        console.log(item)
        return (
          <Box>
            {item.name}
            {item.count}
          </Box>
        )
      })
    }
    </Box>
}
