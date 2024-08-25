import EditUserComponent from '@/components/actions/EditUserComponent'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const EditUser = () => {
    return (
        <>
            <Header />
            <div className="table-container">
                <EditUserComponent />
            </div>
            <Footer/>
        </>

    )
}

export default EditUser