import React, { useEffect, useState } from 'react'
import store from './context'

const StoreProvider = ({children}) => {
    const [nameState,setNameState] = useState(null)
    const [selectedUsers,setSelectedUsers] = useState(null)
  
  return (
    <store.Provider value={{nameState,setNameState,selectedUsers,setSelectedUsers}}>
        {children}
    </store.Provider>
  )
}

export default StoreProvider