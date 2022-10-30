
import styles from "./Ellipsis.module.css";

const Ellipsis = ({color}) => {
    color = color || '#FFFFFF'

    return (
        <div className={styles['lds-ellipsis']}>
            <div style={{background: color}}></div>
            <div style={{background: color}}></div>
            <div style={{background: color}}></div>
            <div style={{background: color}}></div>
        </div>
    )
}
export default Ellipsis;