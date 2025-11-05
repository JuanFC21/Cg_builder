import React, { use, useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, } from '@react-pdf/renderer';
import { createRoot } from 'react-dom/client';
import { PDFViewer } from '@react-pdf/renderer';

const Br = () => "\n";


Font.register({
  family: 'Oswald',
  src: "../fonts/Oswald-SemiBold.ttf",
});

Font.registerHyphenationCallback((word) => {
  return [word];
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    width: 203,
    height: 263,
    border: 2,
    
  },
  green_flags: {
    position: "absolute",
        left: '0px',
        right: '0px',
        padding: 30,
        marginHorizontal: 'auto',
        textAlign: "left",
        justifyContent: 'center',
        fontFamily: 'Oswald',
        fontSize:14,
        color: "#c42525",
        textTransform: "uppercase"
        
  },
  red_flags: {
    position: "absolute",
        left: '0px',
        right: '0px',
        padding: 30,
        marginHorizontal: 'auto',
        textAlign: "left",
        justifyContent: 'center',
        fontFamily: 'Oswald',
        fontSize:14,
        color: "#ffffff",
        textTransform: "uppercase"
        
  },
  p_flags: {
    position: "absolute",
        left: '0px',
        right: '0px',
        padding: 30,
        marginHorizontal: 'auto',
        textAlign: "left",
        justifyContent: 'center',
        fontFamily: 'Oswald',
        fontSize:14,
        color: "#ffffff",
        textTransform: "uppercase"
        
  },
});




const PDF = () =>{
  const [pData, setPData] = useState<any>([])
  const totalCards = 465;
  const cardsPerPage = 9;
  const totalPages = Math.ceil(totalCards/cardsPerPage);


  const fetchData = async () => {
    const response = await fetch('/api/staticdata')
    const jsonData = await response.json();
    console.log(jsonData)
    console.log(jsonData.name)
    console.log(jsonData.items)
    
    





    const getCardStyle = (index:any) => {
      if (index < 209) {
        return "./Parte_detras2.png"
        
      } else if (index < 209 + 62) {
        return "./Parte_detras3.png"
      } else {
        return "./Parte_detras.png"
        
      }
    };

    
    const getCardStyle2 = (index:any) => {
      if (index < 207) {
        return styles.red_flags
      } else if (index < 207 + 62) {
        return styles.p_flags
      } else {
        return styles.green_flags
      }
    };
    



    const pages = Array.from({length: totalPages}, (_, pageIndex) => {
      const start = pageIndex *  cardsPerPage;
      const end  = start + cardsPerPage;

      const pageCards = jsonData.items.slice(start,end);


      return (
        
        <Page key={pageIndex} size="LETTER" style={styles.page}>
          <View key={pageIndex*2} style={{justifyContent: "space-evenly", width: "100%vw", height:"100%vh", flexDirection: "column"}}>


            {
              Array.from({length: 3}).map(( _, rowIndex) =>{
                const rowCards = pageCards.slice(rowIndex * 3, rowIndex * 3  + 3)
                
                return (
                  <View key={rowIndex} style={{justifyContent: "space-evenly", flexDirection: "row-reverse", width: "100%vw"}}>

                    {rowCards.map((card:any,cardIndex:any)=>{
                      const globalIndex = start + rowIndex * 3 + cardIndex;
                      
                      return(

                        <View key={cardIndex} style={styles.section}>
                          <Image key={cardIndex/2} src={getCardStyle(globalIndex)} debug={false} style={{height:"100%", width:"100%",}}></Image>
                          
                        </View>
                      
                      )
                    })
                    }

                  </View>

                )
            }
              
            )
          }


          </View>
        </Page>

      )

    })
      console.log(pages)
      setPData(pages);
    }


    
    
  

  useEffect(() => {
   fetchData()
  
  
  },[])
 
    console.log(pData)
    return(

      <Document>
          {pData}
      </Document>

    )

}


const PDFView = () => {
  const [client, setClient] = useState(false)


  useEffect( () => {
    setClient(true)
  },[])

  return(
    <PDFViewer style={{width:"100%", height:"100vh"}}>
      <PDF></PDF>
    </PDFViewer>
  )

}

export default PDFView;

