import React from 'react'
import { CiSearch } from "react-icons/ci";
export default function Search() {
  return (
    <>
      <div className="input-group">
        <button
          type="submit"
          className="btn btn-outline-secondary"
          id="button-addon1"
        >
<CiSearch />        </button>
        <input
          className="flex-grow-1"
          type="text"
          placeholder="    城市、街道、店名"
          aria-describedby="button-addon1"
        />
      </div>
    </>
  )
}
