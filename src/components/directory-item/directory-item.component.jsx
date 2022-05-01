import { Link } from 'react-router-dom'

import {
    BackgroundImage,
    DirectoryItemContainer,
    Body,
} from './directory-item.styles'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />

            <Body>
                <Link to={`/shop/${category.title}`}>
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </Link>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem
