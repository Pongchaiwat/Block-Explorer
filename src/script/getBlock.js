import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import SimpleDateTime  from 'react-simple-timestamp-to-date';



const GetBlock = () => {
  const url = "https://eth-rinkeby.alchemyapi.io/v2/7oqwJxZUzQKgu5v4FYMWJM0Rr9_CY0td";
  const provider = new ethers.providers.JsonRpcProvider(url)
  const blocks ={};
  const [data, setData] = useState([])
  const totalBlock = 100;
  
  useEffect(() => {
    const fetchTest = async () => {
      const blocks = [];
      await fetch(provider)
      .then((res)=>provider.getBlock())
      .then(async(data)=>{
        //blocks2.push(data)
        for(let i=0; i< totalBlock; i++){
          data = await provider.getBlock(data.number-1)
          blocks.push(data)          
        } 
        
        return BlockArr2(blocks)
        
      })
    };
    fetchTest();
  }, []);

  const BlockArr2 = (blocks) => {
  
      const blocksInfo = []
      for (let blockObj of blocks) {
        blocksInfo.push({
          number: blockObj.number,
          timestamp: Date.now(blockObj.timestamp),
          txn: blockObj.transactions.length,
          miner: blockObj.miner,
          gasUsed: blockObj.gasUsed.toString(),
          gasLimit: blockObj.gasLimit.toString(),
        })
      }
  setData(blocksInfo);
  
}

  
  
  return (
    <div>
      <Container fluid="md">
      <h3>Block Explorer</h3>
      
      {data.length < 1 ? (
        <div>
          LOADING...
          <progress></progress>
        </div>
      ) : (
    
        
        <Table striped bordered hover>
          <thead>
            <tr>
                <th>Block#</th>
                <th>Timestamp</th>
                <th>Txn</th>
                <th>Miner</th>
                <th>Gas Used</th>
                <th>Gas Limit</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value) => (
                  <tr>
                    <td><a href={value.number}>{value.number}</a></td>
                    <td><SimpleDateTime timeSeparator=":" format="MYD" showTime="1" showDate="0" meridians="1">{value.timestamp}</SimpleDateTime></td>
                    <td>{value.txn}</td>
                    <td>{value.miner}</td>
                    <td>{value.gasUsed}</td>
                    <td>{value.gasLimit}</td>
                  </tr>
                ))}
           
          </tbody>
        </Table>
        


      )} 
      </Container>
    </div>
  )
}



export default GetBlock;
