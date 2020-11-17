/**
 * Internal dependencies
 */
import * as ProductConstants from 'calypso/lib/products-values/constants';
import { BillingTerm, ItemType } from '../attributes';
import { PurchasableProduct } from '../types';

const commonAttributes = {
	itemType: ItemType.PRODUCT,
	family: ProductConstants.PRODUCT_JETPACK_SCAN,
};

export const ScanAnnual: PurchasableProduct = {
	slug: ProductConstants.PRODUCT_JETPACK_SCAN,
	attributes: {
		...commonAttributes,
		billingTerm: BillingTerm.ANNUAL,
	},
} as const;

export const ScanMonthly: PurchasableProduct = {
	slug: ProductConstants.PRODUCT_JETPACK_SCAN_MONTHLY,
	attributes: {
		...commonAttributes,
		billingTerm: BillingTerm.MONTHLY,
	},
} as const;