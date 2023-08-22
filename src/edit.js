/**
 * WordPress dependencies
 */
import {
    TextControl,
    Flex,
    FlexBlock,
    FlexItem,
    Button,
    Icon,
    PanelBody,
    PanelRow,
    ColorPicker,
} from '@wordpress/components';

import {
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';

/**
 * Import CSS
 */
import "./index.scss";

/**
 * Edit function for the quiz block.
 * 
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 * 
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.attributes - The attributes passed to the component.
 * @param {string} props.attributes.question - The question for the quiz.
 * @param {string[]} props.attributes.answers - The answers for the quiz.
 * @param {number} props.attributes.correctAnswer - The index of the correct answer.
 * @param {Function} props.setAttributes - The function to set the attributes.
 * 
 * @returns {JSX.Element} - Rendered component.
 */
const Edit = (props) => {
    const blockProps = useBlockProps({
        className: 'cwn-quiz',
        style: {
            backgroundColor: props.attributes.backgroundColor
        }
    })

    const updateQuestion = (question) => {
        props.setAttributes({ question })
    }

    const deleteAnswer = (index) => {
        const answers = props.attributes.answers.filter((answer, i) => i !== index)
        props.setAttributes({ answers })
        
        if (props.attributes.correctAnswer === index) {
            props.setAttributes({ correctAnswer: undefined })
        }
    }

    const markCorrect = (index) => {
        props.setAttributes({ correctAnswer: index })
    }
    
    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Background Color">
                    <PanelRow>
                        <ColorPicker
                            color={props.attributes.backgroundColor}
                            onChangeComplete={(color) => props.setAttributes({ backgroundColor: color.hex })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            <TextControl
                label="Question"
                style={{ 
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                }}
                value={props.attributes.question}
                onChange={updateQuestion}
            />
            <p className='label'>Answers</p>
            {
                props.attributes.answers.map((answer, index) => {
                    return (
                        <Flex key={index} align="start">
                            <FlexBlock>
                                <TextControl
                                    style={{ 
                                        fontSize: '1.25rem',
                                        marginBottom: '1rem'
                                    }}
                                    value={answer}
                                    onChange={(answer) => {
                                        const answers = [...props.attributes.answers]
                                        answers[index] = answer
                                        props.setAttributes({ answers })
                                    }}
                                    autoFocus={answer == undefined} 
                                />
                            </FlexBlock>
                            <FlexItem>
                                <Button onClick={() => markCorrect(index)}>
                                    <Icon
                                        className="action-correct"
                                        icon={props.attributes.correctAnswer === index ? 'star-filled' : 'star-empty'}
                                    />
                                </Button>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    isLink
                                    className="action-delete"
                                    onClick={() => deleteAnswer(index)}
                                >
                                    Remove
                                </Button>
                            </FlexItem>
                        </Flex>
                    )
                })
            }
            <Button
                isPrimary
                onClick={() => {
                    props.setAttributes({ answers: props.attributes.answers.concat([undefined]) })
                }}
            >
                Add Answer
            </Button>
        </div>
    )
}

export default Edit