/**
 * External dependencies
 */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useI18n } from '@automattic/react-i18n';
import { ActionButtons, BackButton, Title } from '@automattic/onboarding';
import LanguagePicker, { createLanguageGroups } from '@automattic/language-picker';
import languages from '@automattic/languages';

/**
 * Internal dependencies
 */
import { ChangeLocaleContextConsumer } from '../../components/locale-context';
import { Step, usePath } from '../../path';
import type { StepNameType } from '../../path';

/**
 * Style dependencies
 */
import './style.scss';

interface Props {
	previousStep?: StepNameType;
}

const LanguageStep: React.FunctionComponent< Props > = ( { previousStep } ) => {
	const { __ } = useI18n();

	// keep a static reference to the previous step
	const staticPreviousStep = React.useRef( previousStep );

	const history = useHistory();
	const makePath = usePath();

	const goBack = ( lang = '' ) => {
		staticPreviousStep.current
			? history.replace( makePath( Step[ staticPreviousStep.current ], lang ) )
			: history.goBack();
	};

	return (
		<ChangeLocaleContextConsumer>
			{ ( changeLocale ) => (
				<div className="gutenboarding-page language">
					<div className="language__heading">
						<Title>{ __( 'Select your site language' ) }</Title>
						<ActionButtons>
							<BackButton onClick={ () => goBack() } />
						</ActionButtons>
					</div>
					<LanguagePicker
						languageGroups={ createLanguageGroups( __ ) }
						languages={ languages }
						onSelectLanguage={ ( language ) => {
							changeLocale( language.langSlug );
							goBack( language.langSlug );
						} }
					/>
				</div>
			) }
		</ChangeLocaleContextConsumer>
	);
};

export default LanguageStep;
