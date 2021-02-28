import {useEffect, useState} from 'react'
import  { Quote } from '@hooks/useGetAllQuotes'
import QuoteCard from '@components/QuoteCard';
import styles from '@styles/SingleDraw.module.css'

interface Props{
    quotesList: Array<Quote>;
}

const SingleDraw: React.FC<Props> = props => {
    const quotesList = props.quotesList;
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quote, setQuote] = useState<Quote>();
    useEffect(() => {
        setQuote(quotesList[quoteIndex])
    }, [quotesList, quoteIndex]); 

    const onQuoteClick = () => {
        setQuoteIndex(quoteIndex+1);
    }

    return (
        <div className={styles.container} onClick={()=>onQuoteClick()}>
            <QuoteCard quote={quote}/>
        </div>
    )
}

export default SingleDraw;