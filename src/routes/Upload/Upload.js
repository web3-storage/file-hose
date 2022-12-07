import React, { useState } from "react";
import { ReactComponent as PermanentIcon } from "../../icons/permanent.svg";
import { ReactComponent as Globe } from "../../icons/globe.svg";

import { Outlet } from "react-router-dom";

export default function Upload() {
  const [files, setFiles] = useState(null);
  const [dataCid, setDataCid] = useState("");
  return (
    <div className="flex flex-column items-center">
      <div>
        <div className="tc">
          <Outlet context={[files, setFiles, dataCid, setDataCid]} />
        </div>
        <section className="mt5 pa3 bt">
          <div className="">
            <h2>
              <Globe width={20} /> Public
            </h2>
            <p>
              All data uploaded to web3.storage is available to anyone who
              requests it using the correct CID. Do not store any private or
              sensitive information in an unencrypted form using web3.storage.
            </p>
          </div>
          <div className="">
            <h2>
              <PermanentIcon width={20} /> Permanent Data
            </h2>
            <p>
              All data uploaded to web3.storage is available to anyone who
              requests it using the correct CID. **Users should not store any
              private or sensitive information in an unencrypted form using
              web3.storage.** Further, deleting files from web3.storage via the
              site's Files page or API will remove them from the file listing
              for a user's account, but nodes on the IPFS network may retain
              copies of the data indefinitely. **Users should not use
              web3.storage to store data that may need to be permanently deleted
              in the future.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
