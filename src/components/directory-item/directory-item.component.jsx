import { useNavigate } from 'react-router-dom'

import {
    BackgroundImage,
    DirectoryItemContainer,
    Body,
} from './directory-item.styles'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category
    const navigate = useNavigate()

    const onNavigateHandler = () => {
        const route = `/shop/${category.title}`
        navigate(route)
    }

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />

            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem
