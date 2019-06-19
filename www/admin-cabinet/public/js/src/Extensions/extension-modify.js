/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 5 2018
 *
 */

/* global globalRootUrl, globalTranslate, Extensions, Form, PbxApi, DebuggerInfo */

const maskListUnsorted = [
	{
		mask: '+247-####', cc: 'AC', name_en: 'Ascension', desc_en: '', name_ru: 'Остров Вознесения', desc_ru: '',
	},
	{
		mask: '+376-###-###', cc: 'AD', name_en: 'Andorra', desc_en: '', name_ru: 'Андорра', desc_ru: '',
	},
	{
		mask: '+971-5#-###-####', cc: 'AE', name_en: 'United Arab Emirates', desc_en: 'mobile', name_ru: 'Объединенные Арабские Эмираты', desc_ru: 'мобильные',
	},
	{
		mask: '+971-#-###-####', cc: 'AE', name_en: 'United Arab Emirates', desc_en: '', name_ru: 'Объединенные Арабские Эмираты', desc_ru: '',
	},
	{
		mask: '+93-##-###-####', cc: 'AF', name_en: 'Afghanistan', desc_en: '', name_ru: 'Афганистан', desc_ru: '',
	},
	{
		mask: '+1(268)###-####', cc: 'AG', name_en: 'Antigua & Barbuda', desc_en: '', name_ru: 'Антигуа и Барбуда', desc_ru: '',
	},
	{
		mask: '+1(264)###-####', cc: 'AI', name_en: 'Anguilla', desc_en: '', name_ru: 'Ангилья', desc_ru: '',
	},
	{
		mask: '+355(###)###-###', cc: 'AL', name_en: 'Albania', desc_en: '', name_ru: 'Албания', desc_ru: '',
	},
	{
		mask: '+374-##-###-###', cc: 'AM', name_en: 'Armenia', desc_en: '', name_ru: 'Армения', desc_ru: '',
	},
	{
		mask: '+599-###-####', cc: 'AN', name_en: 'Caribbean Netherlands', desc_en: '', name_ru: 'Карибские Нидерланды', desc_ru: '',
	},
	{
		mask: '+599-###-####', cc: 'AN', name_en: 'Netherlands Antilles', desc_en: '', name_ru: 'Нидерландские Антильские острова', desc_ru: '',
	},
	{
		mask: '+599-9###-####', cc: 'AN', name_en: 'Netherlands Antilles', desc_en: 'Curacao', name_ru: 'Нидерландские Антильские острова', desc_ru: 'Кюрасао',
	},
	{
		mask: '+244(###)###-###', cc: 'AO', name_en: 'Angola', desc_en: '', name_ru: 'Ангола', desc_ru: '',
	},
	{
		mask: '+672-1##-###', cc: 'AQ', name_en: 'Australian bases in Antarctica', desc_en: '', name_ru: 'Австралийская антарктическая база', desc_ru: '',
	},
	{
		mask: '+54(###)###-####', cc: 'AR', name_en: 'Argentina', desc_en: '', name_ru: 'Аргентина', desc_ru: '',
	},
	{
		mask: '+1(684)###-####', cc: 'AS', name_en: 'American Samoa', desc_en: '', name_ru: 'Американское Самоа', desc_ru: '',
	},
	{
		mask: '+43(###)###-####', cc: 'AT', name_en: 'Austria', desc_en: '', name_ru: 'Австрия', desc_ru: '',
	},
	{
		mask: '+61-#-####-####', cc: 'AU', name_en: 'Australia', desc_en: '', name_ru: 'Австралия', desc_ru: '',
	},
	{
		mask: '+297-###-####', cc: 'AW', name_en: 'Aruba', desc_en: '', name_ru: 'Аруба', desc_ru: '',
	},
	{
		mask: '+994-##-###-##-##', cc: 'AZ', name_en: 'Azerbaijan', desc_en: '', name_ru: 'Азербайджан', desc_ru: '',
	},
	{
		mask: '+387-##-#####', cc: 'BA', name_en: 'Bosnia and Herzegovina', desc_en: '', name_ru: 'Босния и Герцеговина', desc_ru: '',
	},
	{
		mask: '+387-##-####', cc: 'BA', name_en: 'Bosnia and Herzegovina', desc_en: '', name_ru: 'Босния и Герцеговина', desc_ru: '',
	},
	{
		mask: '+1(246)###-####', cc: 'BB', name_en: 'Barbados', desc_en: '', name_ru: 'Барбадос', desc_ru: '',
	},
	{
		mask: '+880-##-###-###', cc: 'BD', name_en: 'Bangladesh', desc_en: '', name_ru: 'Бангладеш', desc_ru: '',
	},
	{
		mask: '+32(###)###-###', cc: 'BE', name_en: 'Belgium', desc_en: '', name_ru: 'Бельгия', desc_ru: '',
	},
	{
		mask: '+226-##-##-####', cc: 'BF', name_en: 'Burkina Faso', desc_en: '', name_ru: 'Буркина Фасо', desc_ru: '',
	},
	{
		mask: '+359(###)###-###', cc: 'BG', name_en: 'Bulgaria', desc_en: '', name_ru: 'Болгария', desc_ru: '',
	},
	{
		mask: '+973-####-####', cc: 'BH', name_en: 'Bahrain', desc_en: '', name_ru: 'Бахрейн', desc_ru: '',
	},
	{
		mask: '+257-##-##-####', cc: 'BI', name_en: 'Burundi', desc_en: '', name_ru: 'Бурунди', desc_ru: '',
	},
	{
		mask: '+229-##-##-####', cc: 'BJ', name_en: 'Benin', desc_en: '', name_ru: 'Бенин', desc_ru: '',
	},
	{
		mask: '+1(441)###-####', cc: 'BM', name_en: 'Bermuda', desc_en: '', name_ru: 'Бермудские острова', desc_ru: '',
	},
	{
		mask: '+673-###-####', cc: 'BN', name_en: 'Brunei Darussalam', desc_en: '', name_ru: 'Бруней-Даруссалам', desc_ru: '',
	},
	{
		mask: '+591-#-###-####', cc: 'BO', name_en: 'Bolivia', desc_en: '', name_ru: 'Боливия', desc_ru: '',
	},
	{
		mask: '+55(##)####-####', cc: 'BR', name_en: 'Brazil', desc_en: '', name_ru: 'Бразилия', desc_ru: '',
	},
	{
		mask: '+55(##)7###-####', cc: 'BR', name_en: 'Brazil', desc_en: 'mobile', name_ru: 'Бразилия', desc_ru: 'мобильные',
	},
	{
		mask: '+55(##)9####-####', cc: 'BR', name_en: 'Brazil', desc_en: 'mobile', name_ru: 'Бразилия', desc_ru: 'мобильные',
	},
	{
		mask: '+1(242)###-####', cc: 'BS', name_en: 'Bahamas', desc_en: '', name_ru: 'Багамские Острова', desc_ru: '',
	},
	{
		mask: '+975-17-###-###', cc: 'BT', name_en: 'Bhutan', desc_en: '', name_ru: 'Бутан', desc_ru: '',
	},
	{
		mask: '+975-#-###-###', cc: 'BT', name_en: 'Bhutan', desc_en: '', name_ru: 'Бутан', desc_ru: '',
	},
	{
		mask: '+267-##-###-###', cc: 'BW', name_en: 'Botswana', desc_en: '', name_ru: 'Ботсвана', desc_ru: '',
	},
	{
		mask: '+375(##)###-##-##', cc: 'BY', name_en: 'Belarus', desc_en: '', name_ru: 'Беларусь (Белоруссия)', desc_ru: '',
	},
	{
		mask: '+501-###-####', cc: 'BZ', name_en: 'Belize', desc_en: '', name_ru: 'Белиз', desc_ru: '',
	},
	{
		mask: '+243(###)###-###', cc: 'CD', name_en: 'Dem. Rep. Congo', desc_en: '', name_ru: 'Дем. Респ. Конго (Киншаса)', desc_ru: '',
	},
	{
		mask: '+236-##-##-####', cc: 'CF', name_en: 'Central African Republic', desc_en: '', name_ru: 'Центральноафриканская Республика', desc_ru: '',
	},
	{
		mask: '+242-##-###-####', cc: 'CG', name_en: 'Congo (Brazzaville)', desc_en: '', name_ru: 'Конго (Браззавиль)', desc_ru: '',
	},
	{
		mask: '+41-##-###-####', cc: 'CH', name_en: 'Switzerland', desc_en: '', name_ru: 'Швейцария', desc_ru: '',
	},
	{
		mask: '+225-##-###-###', cc: 'CI', name_en: 'Cote d’Ivoire (Ivory Coast)', desc_en: '', name_ru: 'Кот-д’Ивуар', desc_ru: '',
	},
	{
		mask: '+682-##-###', cc: 'CK', name_en: 'Cook Islands', desc_en: '', name_ru: 'Острова Кука', desc_ru: '',
	},
	{
		mask: '+56-#-####-####', cc: 'CL', name_en: 'Chile', desc_en: '', name_ru: 'Чили', desc_ru: '',
	},
	{
		mask: '+237-####-####', cc: 'CM', name_en: 'Cameroon', desc_en: '', name_ru: 'Камерун', desc_ru: '',
	},
	{
		mask: '+86(###)####-####', cc: 'CN', name_en: 'China (PRC)', desc_en: '', name_ru: 'Китайская Н.Р.', desc_ru: '',
	},
	{
		mask: '+86(###)####-###', cc: 'CN', name_en: 'China (PRC)', desc_en: '', name_ru: 'Китайская Н.Р.', desc_ru: '',
	},
	{
		mask: '+86-##-#####-#####', cc: 'CN', name_en: 'China (PRC)', desc_en: '', name_ru: 'Китайская Н.Р.', desc_ru: '',
	},
	{
		mask: '+57(###)###-####', cc: 'CO', name_en: 'Colombia', desc_en: '', name_ru: 'Колумбия', desc_ru: '',
	},
	{
		mask: '+506-####-####', cc: 'CR', name_en: 'Costa Rica', desc_en: '', name_ru: 'Коста-Рика', desc_ru: '',
	},
	{
		mask: '+53-#-###-####', cc: 'CU', name_en: 'Cuba', desc_en: '', name_ru: 'Куба', desc_ru: '',
	},
	{
		mask: '+238(###)##-##', cc: 'CV', name_en: 'Cape Verde', desc_en: '', name_ru: 'Кабо-Верде', desc_ru: '',
	},
	{
		mask: '+599-###-####', cc: 'CW', name_en: 'Curacao', desc_en: '', name_ru: 'Кюрасао', desc_ru: '',
	},
	{
		mask: '+357-##-###-###', cc: 'CY', name_en: 'Cyprus', desc_en: '', name_ru: 'Кипр', desc_ru: '',
	},
	{
		mask: '+420(###)###-###', cc: 'CZ', name_en: 'Czech Republic', desc_en: '', name_ru: 'Чехия', desc_ru: '',
	},
	{
		mask: '+49(####)###-####', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+49(###)###-####', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+49(###)##-####', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+49(###)##-###', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+49(###)##-##', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+49-###-###', cc: 'DE', name_en: 'Germany', desc_en: '', name_ru: 'Германия', desc_ru: '',
	},
	{
		mask: '+253-##-##-##-##', cc: 'DJ', name_en: 'Djibouti', desc_en: '', name_ru: 'Джибути', desc_ru: '',
	},
	{
		mask: '+45-##-##-##-##', cc: 'DK', name_en: 'Denmark', desc_en: '', name_ru: 'Дания', desc_ru: '',
	},
	{
		mask: '+1(767)###-####', cc: 'DM', name_en: 'Dominica', desc_en: '', name_ru: 'Доминика', desc_ru: '',
	},
	{
		mask: '+1(809)###-####', cc: 'DO', name_en: 'Dominican Republic', desc_en: '', name_ru: 'Доминиканская Республика', desc_ru: '',
	},
	{
		mask: '+1(829)###-####', cc: 'DO', name_en: 'Dominican Republic', desc_en: '', name_ru: 'Доминиканская Республика', desc_ru: '',
	},
	{
		mask: '+1(849)###-####', cc: 'DO', name_en: 'Dominican Republic', desc_en: '', name_ru: 'Доминиканская Республика', desc_ru: '',
	},
	{
		mask: '+213-##-###-####', cc: 'DZ', name_en: 'Algeria', desc_en: '', name_ru: 'Алжир', desc_ru: '',
	},
	{
		mask: '+593-##-###-####', cc: 'EC', name_en: 'Ecuador ', desc_en: 'mobile', name_ru: 'Эквадор ', desc_ru: 'мобильные',
	},
	{
		mask: '+593-#-###-####', cc: 'EC', name_en: 'Ecuador', desc_en: '', name_ru: 'Эквадор', desc_ru: '',
	},
	{
		mask: '+372-####-####', cc: 'EE', name_en: 'Estonia ', desc_en: 'mobile', name_ru: 'Эстония ', desc_ru: 'мобильные',
	},
	{
		mask: '+372-###-####', cc: 'EE', name_en: 'Estonia', desc_en: '', name_ru: 'Эстония', desc_ru: '',
	},
	{
		mask: '+20(###)###-####', cc: 'EG', name_en: 'Egypt', desc_en: '', name_ru: 'Египет', desc_ru: '',
	},
	{
		mask: '+291-#-###-###', cc: 'ER', name_en: 'Eritrea', desc_en: '', name_ru: 'Эритрея', desc_ru: '',
	},
	{
		mask: '+34(###)###-###', cc: 'ES', name_en: 'Spain', desc_en: '', name_ru: 'Испания', desc_ru: '',
	},
	{
		mask: '+251-##-###-####', cc: 'ET', name_en: 'Ethiopia', desc_en: '', name_ru: 'Эфиопия', desc_ru: '',
	},
	{
		mask: '+358(###)###-##-##', cc: 'FI', name_en: 'Finland', desc_en: '', name_ru: 'Финляндия', desc_ru: '',
	},
	{
		mask: '+679-##-#####', cc: 'FJ', name_en: 'Fiji', desc_en: '', name_ru: 'Фиджи', desc_ru: '',
	},
	{
		mask: '+500-#####', cc: 'FK', name_en: 'Falkland Islands', desc_en: '', name_ru: 'Фолклендские острова', desc_ru: '',
	},
	{
		mask: '+691-###-####', cc: 'FM', name_en: 'F.S. Micronesia', desc_en: '', name_ru: 'Ф.Ш. Микронезии', desc_ru: '',
	},
	{
		mask: '+298-###-###', cc: 'FO', name_en: 'Faroe Islands', desc_en: '', name_ru: 'Фарерские острова', desc_ru: '',
	},
	{
		mask: '+262-#####-####', cc: 'FR', name_en: 'Mayotte', desc_en: '', name_ru: 'Майотта', desc_ru: '',
	},
	{
		mask: '+33(###)###-###', cc: 'FR', name_en: 'France', desc_en: '', name_ru: 'Франция', desc_ru: '',
	},
	{
		mask: '+508-##-####', cc: 'FR', name_en: 'St Pierre & Miquelon', desc_en: '', name_ru: 'Сен-Пьер и Микелон', desc_ru: '',
	},
	{
		mask: '+590(###)###-###', cc: 'FR', name_en: 'Guadeloupe', desc_en: '', name_ru: 'Гваделупа', desc_ru: '',
	},
	{
		mask: '+241-#-##-##-##', cc: 'GA', name_en: 'Gabon', desc_en: '', name_ru: 'Габон', desc_ru: '',
	},
	{
		mask: '+1(473)###-####', cc: 'GD', name_en: 'Grenada', desc_en: '', name_ru: 'Гренада', desc_ru: '',
	},
	{
		mask: '+995(###)###-###', cc: 'GE', name_en: 'Rep. of Georgia', desc_en: '', name_ru: 'Грузия', desc_ru: '',
	},
	{
		mask: '+594-#####-####', cc: 'GF', name_en: 'Guiana (French)', desc_en: '', name_ru: 'Фр. Гвиана', desc_ru: '',
	},
	{
		mask: '+233(###)###-###', cc: 'GH', name_en: 'Ghana', desc_en: '', name_ru: 'Гана', desc_ru: '',
	},
	{
		mask: '+350-###-#####', cc: 'GI', name_en: 'Gibraltar', desc_en: '', name_ru: 'Гибралтар', desc_ru: '',
	},
	{
		mask: '+299-##-##-##', cc: 'GL', name_en: 'Greenland', desc_en: '', name_ru: 'Гренландия', desc_ru: '',
	},
	{
		mask: '+220(###)##-##', cc: 'GM', name_en: 'Gambia', desc_en: '', name_ru: 'Гамбия', desc_ru: '',
	},
	{
		mask: '+224-##-###-###', cc: 'GN', name_en: 'Guinea', desc_en: '', name_ru: 'Гвинея', desc_ru: '',
	},
	{
		mask: '+240-##-###-####', cc: 'GQ', name_en: 'Equatorial Guinea', desc_en: '', name_ru: 'Экваториальная Гвинея', desc_ru: '',
	},
	{
		mask: '+30(###)###-####', cc: 'GR', name_en: 'Greece', desc_en: '', name_ru: 'Греция', desc_ru: '',
	},
	{
		mask: '+502-#-###-####', cc: 'GT', name_en: 'Guatemala', desc_en: '', name_ru: 'Гватемала', desc_ru: '',
	},
	{
		mask: '+1(671)###-####', cc: 'GU', name_en: 'Guam', desc_en: '', name_ru: 'Гуам', desc_ru: '',
	},
	{
		mask: '+245-#-######', cc: 'GW', name_en: 'Guinea-Bissau', desc_en: '', name_ru: 'Гвинея-Бисау', desc_ru: '',
	},
	{
		mask: '+592-###-####', cc: 'GY', name_en: 'Guyana', desc_en: '', name_ru: 'Гайана', desc_ru: '',
	},
	{
		mask: '+852-####-####', cc: 'HK', name_en: 'Hong Kong', desc_en: '', name_ru: 'Гонконг', desc_ru: '',
	},
	{
		mask: '+504-####-####', cc: 'HN', name_en: 'Honduras', desc_en: '', name_ru: 'Гондурас', desc_ru: '',
	},
	{
		mask: '+385-##-###-###', cc: 'HR', name_en: 'Croatia', desc_en: '', name_ru: 'Хорватия', desc_ru: '',
	},
	{
		mask: '+509-##-##-####', cc: 'HT', name_en: 'Haiti', desc_en: '', name_ru: 'Гаити', desc_ru: '',
	},
	{
		mask: '+36(###)###-###', cc: 'HU', name_en: 'Hungary', desc_en: '', name_ru: 'Венгрия', desc_ru: '',
	},
	{
		mask: '+62(8##)###-####', cc: 'ID', name_en: 'Indonesia ', desc_en: 'mobile', name_ru: 'Индонезия ', desc_ru: 'мобильные',
	},
	{
		mask: '+62-##-###-##', cc: 'ID', name_en: 'Indonesia', desc_en: '', name_ru: 'Индонезия', desc_ru: '',
	},
	{
		mask: '+62-##-###-###', cc: 'ID', name_en: 'Indonesia', desc_en: '', name_ru: 'Индонезия', desc_ru: '',
	},
	{
		mask: '+62-##-###-####', cc: 'ID', name_en: 'Indonesia', desc_en: '', name_ru: 'Индонезия', desc_ru: '',
	},
	{
		mask: '+62(8##)###-###', cc: 'ID', name_en: 'Indonesia ', desc_en: 'mobile', name_ru: 'Индонезия ', desc_ru: 'мобильные',
	},
	{
		mask: '+62(8##)###-##-###', cc: 'ID', name_en: 'Indonesia ', desc_en: 'mobile', name_ru: 'Индонезия ', desc_ru: 'мобильные',
	},
	{
		mask: '+353(###)###-###', cc: 'IE', name_en: 'Ireland', desc_en: '', name_ru: 'Ирландия', desc_ru: '',
	},
	{
		mask: '+972-5#-###-####', cc: 'IL', name_en: 'Israel ', desc_en: 'mobile', name_ru: 'Израиль ', desc_ru: 'мобильные',
	},
	{
		mask: '+972-#-###-####', cc: 'IL', name_en: 'Israel', desc_en: '', name_ru: 'Израиль', desc_ru: '',
	},
	{
		mask: '+91(####)###-###', cc: 'IN', name_en: 'India', desc_en: '', name_ru: 'Индия', desc_ru: '',
	},
	{
		mask: '+246-###-####', cc: 'IO', name_en: 'Diego Garcia', desc_en: '', name_ru: 'Диего-Гарсия', desc_ru: '',
	},
	{
		mask: '+964(###)###-####', cc: 'IQ', name_en: 'Iraq', desc_en: '', name_ru: 'Ирак', desc_ru: '',
	},
	{
		mask: '+98(###)###-####', cc: 'IR', name_en: 'Iran', desc_en: '', name_ru: 'Иран', desc_ru: '',
	},
	{
		mask: '+354-###-####', cc: 'IS', name_en: 'Iceland', desc_en: '', name_ru: 'Исландия', desc_ru: '',
	},
	{
		mask: '+39(###)####-###', cc: 'IT', name_en: 'Italy', desc_en: '', name_ru: 'Италия', desc_ru: '',
	},
	{
		mask: '+1(876)###-####', cc: 'JM', name_en: 'Jamaica', desc_en: '', name_ru: 'Ямайка', desc_ru: '',
	},
	{
		mask: '+962-#-####-####', cc: 'JO', name_en: 'Jordan', desc_en: '', name_ru: 'Иордания', desc_ru: '',
	},
	{
		mask: '+81-##-####-####', cc: 'JP', name_en: 'Japan ', desc_en: 'mobile', name_ru: 'Япония ', desc_ru: 'мобильные',
	},
	{
		mask: '+81(###)###-###', cc: 'JP', name_en: 'Japan', desc_en: '', name_ru: 'Япония', desc_ru: '',
	},
	{
		mask: '+254-###-######', cc: 'KE', name_en: 'Kenya', desc_en: '', name_ru: 'Кения', desc_ru: '',
	},
	{
		mask: '+996(###)###-###', cc: 'KG', name_en: 'Kyrgyzstan', desc_en: '', name_ru: 'Киргизия', desc_ru: '',
	},
	{
		mask: '+855-##-###-###', cc: 'KH', name_en: 'Cambodia', desc_en: '', name_ru: 'Камбоджа', desc_ru: '',
	},
	{
		mask: '+686-##-###', cc: 'KI', name_en: 'Kiribati', desc_en: '', name_ru: 'Кирибати', desc_ru: '',
	},
	{
		mask: '+269-##-#####', cc: 'KM', name_en: 'Comoros', desc_en: '', name_ru: 'Коморы', desc_ru: '',
	},
	{
		mask: '+1(869)###-####', cc: 'KN', name_en: 'Saint Kitts & Nevis', desc_en: '', name_ru: 'Сент-Китс и Невис', desc_ru: '',
	},
	{
		mask: '+850-191-###-####', cc: 'KP', name_en: 'DPR Korea (North) ', desc_en: 'mobile', name_ru: 'Корейская НДР ', desc_ru: 'мобильные',
	},
	{
		mask: '+850-##-###-###', cc: 'KP', name_en: 'DPR Korea (North)', desc_en: '', name_ru: 'Корейская НДР', desc_ru: '',
	},
	{
		mask: '+850-###-####-###', cc: 'KP', name_en: 'DPR Korea (North)', desc_en: '', name_ru: 'Корейская НДР', desc_ru: '',
	},
	{
		mask: '+850-###-###', cc: 'KP', name_en: 'DPR Korea (North)', desc_en: '', name_ru: 'Корейская НДР', desc_ru: '',
	},
	{
		mask: '+850-####-####', cc: 'KP', name_en: 'DPR Korea (North)', desc_en: '', name_ru: 'Корейская НДР', desc_ru: '',
	},
	{
		mask: '+850-####-#############', cc: 'KP', name_en: 'DPR Korea (North)', desc_en: '', name_ru: 'Корейская НДР', desc_ru: '',
	},
	{
		mask: '+82-##-###-####', cc: 'KR', name_en: 'Korea (South)', desc_en: '', name_ru: 'Респ. Корея', desc_ru: '',
	},
	{
		mask: '+965-####-####', cc: 'KW', name_en: 'Kuwait', desc_en: '', name_ru: 'Кувейт', desc_ru: '',
	},
	{
		mask: '+1(345)###-####', cc: 'KY', name_en: 'Cayman Islands', desc_en: '', name_ru: 'Каймановы острова', desc_ru: '',
	},
	{
		mask: '+7(6##)###-##-##', cc: 'KZ', name_en: 'Kazakhstan', desc_en: '', name_ru: 'Казахстан', desc_ru: '',
	},
	{
		mask: '+7(7##)###-##-##', cc: 'KZ', name_en: 'Kazakhstan', desc_en: '', name_ru: 'Казахстан', desc_ru: '',
	},
	{
		mask: '+856(20##)###-###', cc: 'LA', name_en: 'Laos ', desc_en: 'mobile', name_ru: 'Лаос ', desc_ru: 'мобильные',
	},
	{
		mask: '+856-##-###-###', cc: 'LA', name_en: 'Laos', desc_en: '', name_ru: 'Лаос', desc_ru: '',
	},
	{
		mask: '+961-##-###-###', cc: 'LB', name_en: 'Lebanon ', desc_en: 'mobile', name_ru: 'Ливан ', desc_ru: 'мобильные',
	},
	{
		mask: '+961-#-###-###', cc: 'LB', name_en: 'Lebanon', desc_en: '', name_ru: 'Ливан', desc_ru: '',
	},
	{
		mask: '+1(758)###-####', cc: 'LC', name_en: 'Saint Lucia', desc_en: '', name_ru: 'Сент-Люсия', desc_ru: '',
	},
	{
		mask: '+423(###)###-####', cc: 'LI', name_en: 'Liechtenstein', desc_en: '', name_ru: 'Лихтенштейн', desc_ru: '',
	},
	{
		mask: '+94-##-###-####', cc: 'LK', name_en: 'Sri Lanka', desc_en: '', name_ru: 'Шри-Ланка', desc_ru: '',
	},
	{
		mask: '+231-##-###-###', cc: 'LR', name_en: 'Liberia', desc_en: '', name_ru: 'Либерия', desc_ru: '',
	},
	{
		mask: '+266-#-###-####', cc: 'LS', name_en: 'Lesotho', desc_en: '', name_ru: 'Лесото', desc_ru: '',
	},
	{
		mask: '+370(###)##-###', cc: 'LT', name_en: 'Lithuania', desc_en: '', name_ru: 'Литва', desc_ru: '',
	},
	{
		mask: '+352(###)###-###', cc: 'LU', name_en: 'Luxembourg', desc_en: '', name_ru: 'Люксембург', desc_ru: '',
	},
	{
		mask: '+371-##-###-###', cc: 'LV', name_en: 'Latvia', desc_en: '', name_ru: 'Латвия', desc_ru: '',
	},
	{
		mask: '+218-##-###-###', cc: 'LY', name_en: 'Libya', desc_en: '', name_ru: 'Ливия', desc_ru: '',
	},
	{
		mask: '+218-21-###-####', cc: 'LY', name_en: 'Libya', desc_en: 'Tripoli', name_ru: 'Ливия', desc_ru: 'Триполи',
	},
	{
		mask: '+212-##-####-###', cc: 'MA', name_en: 'Morocco', desc_en: '', name_ru: 'Марокко', desc_ru: '',
	},
	{
		mask: '+377(###)###-###', cc: 'MC', name_en: 'Monaco', desc_en: '', name_ru: 'Монако', desc_ru: '',
	},
	{
		mask: '+377-##-###-###', cc: 'MC', name_en: 'Monaco', desc_en: '', name_ru: 'Монако', desc_ru: '',
	},
	{
		mask: '+373-####-####', cc: 'MD', name_en: 'Moldova', desc_en: '', name_ru: 'Молдова', desc_ru: '',
	},
	{
		mask: '+382-##-###-###', cc: 'ME', name_en: 'Montenegro', desc_en: '', name_ru: 'Черногория', desc_ru: '',
	},
	{
		mask: '+261-##-##-#####', cc: 'MG', name_en: 'Madagascar', desc_en: '', name_ru: 'Мадагаскар', desc_ru: '',
	},
	{
		mask: '+692-###-####', cc: 'MH', name_en: 'Marshall Islands', desc_en: '', name_ru: 'Маршалловы Острова', desc_ru: '',
	},
	{
		mask: '+389-##-###-###', cc: 'MK', name_en: 'Republic of Macedonia', desc_en: '', name_ru: 'Респ. Македония', desc_ru: '',
	},
	{
		mask: '+223-##-##-####', cc: 'ML', name_en: 'Mali', desc_en: '', name_ru: 'Мали', desc_ru: '',
	},
	{
		mask: '+95-##-###-###', cc: 'MM', name_en: 'Burma (Myanmar)', desc_en: '', name_ru: 'Бирма (Мьянма)', desc_ru: '',
	},
	{
		mask: '+95-#-###-###', cc: 'MM', name_en: 'Burma (Myanmar)', desc_en: '', name_ru: 'Бирма (Мьянма)', desc_ru: '',
	},
	{
		mask: '+95-###-###', cc: 'MM', name_en: 'Burma (Myanmar)', desc_en: '', name_ru: 'Бирма (Мьянма)', desc_ru: '',
	},
	{
		mask: '+976-##-##-####', cc: 'MN', name_en: 'Mongolia', desc_en: '', name_ru: 'Монголия', desc_ru: '',
	},
	{
		mask: '+853-####-####', cc: 'MO', name_en: 'Macau', desc_en: '', name_ru: 'Макао', desc_ru: '',
	},
	{
		mask: '+1(670)###-####', cc: 'MP', name_en: 'Northern Mariana Islands', desc_en: '', name_ru: 'Северные Марианские острова Сайпан', desc_ru: '',
	},
	{
		mask: '+596(###)##-##-##', cc: 'MQ', name_en: 'Martinique', desc_en: '', name_ru: 'Мартиника', desc_ru: '',
	},
	{
		mask: '+222-##-##-####', cc: 'MR', name_en: 'Mauritania', desc_en: '', name_ru: 'Мавритания', desc_ru: '',
	},
	{
		mask: '+1(664)###-####', cc: 'MS', name_en: 'Montserrat', desc_en: '', name_ru: 'Монтсеррат', desc_ru: '',
	},
	{
		mask: '+356-####-####', cc: 'MT', name_en: 'Malta', desc_en: '', name_ru: 'Мальта', desc_ru: '',
	},
	{
		mask: '+230-###-####', cc: 'MU', name_en: 'Mauritius', desc_en: '', name_ru: 'Маврикий', desc_ru: '',
	},
	{
		mask: '+960-###-####', cc: 'MV', name_en: 'Maldives', desc_en: '', name_ru: 'Мальдивские острова', desc_ru: '',
	},
	{
		mask: '+265-1-###-###', cc: 'MW', name_en: 'Malawi', desc_en: 'Telecom Ltd', name_ru: 'Малави', desc_ru: 'Telecom Ltd',
	},
	{
		mask: '+265-#-####-####', cc: 'MW', name_en: 'Malawi', desc_en: '', name_ru: 'Малави', desc_ru: '',
	},
	{
		mask: '+52(###)###-####', cc: 'MX', name_en: 'Mexico', desc_en: '', name_ru: 'Мексика', desc_ru: '',
	},
	{
		mask: '+52-##-##-####', cc: 'MX', name_en: 'Mexico', desc_en: '', name_ru: 'Мексика', desc_ru: '',
	},
	{
		mask: '+60-##-###-####', cc: 'MY', name_en: 'Malaysia ', desc_en: 'mobile', name_ru: 'Малайзия ', desc_ru: 'мобильные',
	},
	{
		mask: '+60(###)###-###', cc: 'MY', name_en: 'Malaysia', desc_en: '', name_ru: 'Малайзия', desc_ru: '',
	},
	{
		mask: '+60-##-###-###', cc: 'MY', name_en: 'Malaysia', desc_en: '', name_ru: 'Малайзия', desc_ru: '',
	},
	{
		mask: '+60-#-###-###', cc: 'MY', name_en: 'Malaysia', desc_en: '', name_ru: 'Малайзия', desc_ru: '',
	},
	{
		mask: '+258-##-###-###', cc: 'MZ', name_en: 'Mozambique', desc_en: '', name_ru: 'Мозамбик', desc_ru: '',
	},
	{
		mask: '+264-##-###-####', cc: 'NA', name_en: 'Namibia', desc_en: '', name_ru: 'Намибия', desc_ru: '',
	},
	{
		mask: '+687-##-####', cc: 'NC', name_en: 'New Caledonia', desc_en: '', name_ru: 'Новая Каледония', desc_ru: '',
	},
	{
		mask: '+227-##-##-####', cc: 'NE', name_en: 'Niger', desc_en: '', name_ru: 'Нигер', desc_ru: '',
	},
	{
		mask: '+672-3##-###', cc: 'NF', name_en: 'Norfolk Island', desc_en: '', name_ru: 'Норфолк (остров)', desc_ru: '',
	},
	{
		mask: '+234(###)###-####', cc: 'NG', name_en: 'Nigeria', desc_en: '', name_ru: 'Нигерия', desc_ru: '',
	},
	{
		mask: '+234-##-###-###', cc: 'NG', name_en: 'Nigeria', desc_en: '', name_ru: 'Нигерия', desc_ru: '',
	},
	{
		mask: '+234-##-###-##', cc: 'NG', name_en: 'Nigeria', desc_en: '', name_ru: 'Нигерия', desc_ru: '',
	},
	{
		mask: '+234(###)###-####', cc: 'NG', name_en: 'Nigeria ', desc_en: 'mobile', name_ru: 'Нигерия ', desc_ru: 'мобильные',
	},
	{
		mask: '+505-####-####', cc: 'NI', name_en: 'Nicaragua', desc_en: '', name_ru: 'Никарагуа', desc_ru: '',
	},
	{
		mask: '+31-##-###-####', cc: 'NL', name_en: 'Netherlands', desc_en: '', name_ru: 'Нидерланды', desc_ru: '',
	},
	{
		mask: '+47(###)##-###', cc: 'NO', name_en: 'Norway', desc_en: '', name_ru: 'Норвегия', desc_ru: '',
	},
	{
		mask: '+977-##-###-###', cc: 'NP', name_en: 'Nepal', desc_en: '', name_ru: 'Непал', desc_ru: '',
	},
	{
		mask: '+674-###-####', cc: 'NR', name_en: 'Nauru', desc_en: '', name_ru: 'Науру', desc_ru: '',
	},
	{
		mask: '+683-####', cc: 'NU', name_en: 'Niue', desc_en: '', name_ru: 'Ниуэ', desc_ru: '',
	},
	{
		mask: '+64(###)###-###', cc: 'NZ', name_en: 'New Zealand', desc_en: '', name_ru: 'Новая Зеландия', desc_ru: '',
	},
	{
		mask: '+64-##-###-###', cc: 'NZ', name_en: 'New Zealand', desc_en: '', name_ru: 'Новая Зеландия', desc_ru: '',
	},
	{
		mask: '+64(###)###-####', cc: 'NZ', name_en: 'New Zealand', desc_en: '', name_ru: 'Новая Зеландия', desc_ru: '',
	},
	{
		mask: '+968-##-###-###', cc: 'OM', name_en: 'Oman', desc_en: '', name_ru: 'Оман', desc_ru: '',
	},
	{
		mask: '+507-###-####', cc: 'PA', name_en: 'Panama', desc_en: '', name_ru: 'Панама', desc_ru: '',
	},
	{
		mask: '+51(###)###-###', cc: 'PE', name_en: 'Peru', desc_en: '', name_ru: 'Перу', desc_ru: '',
	},
	{
		mask: '+689-##-##-##', cc: 'PF', name_en: 'French Polynesia', desc_en: '', name_ru: 'Французская Полинезия (Таити)', desc_ru: '',
	},
	{
		mask: '+675(###)##-###', cc: 'PG', name_en: 'Papua New Guinea', desc_en: '', name_ru: 'Папуа-Новая Гвинея', desc_ru: '',
	},
	{
		mask: '+63(###)###-####', cc: 'PH', name_en: 'Philippines', desc_en: '', name_ru: 'Филиппины', desc_ru: '',
	},
	{
		mask: '+92(###)###-####', cc: 'PK', name_en: 'Pakistan', desc_en: '', name_ru: 'Пакистан', desc_ru: '',
	},
	{
		mask: '+48(###)###-###', cc: 'PL', name_en: 'Poland', desc_en: '', name_ru: 'Польша', desc_ru: '',
	},
	{
		mask: '+970-##-###-####', cc: 'PS', name_en: 'Palestine', desc_en: '', name_ru: 'Палестина', desc_ru: '',
	},
	{
		mask: '+351-##-###-####', cc: 'PT', name_en: 'Portugal', desc_en: '', name_ru: 'Португалия', desc_ru: '',
	},
	{
		mask: '+680-###-####', cc: 'PW', name_en: 'Palau', desc_en: '', name_ru: 'Палау', desc_ru: '',
	},
	{
		mask: '+595(###)###-###', cc: 'PY', name_en: 'Paraguay', desc_en: '', name_ru: 'Парагвай', desc_ru: '',
	},
	{
		mask: '+974-####-####', cc: 'QA', name_en: 'Qatar', desc_en: '', name_ru: 'Катар', desc_ru: '',
	},
	{
		mask: '+262-#####-####', cc: 'RE', name_en: 'Reunion', desc_en: '', name_ru: 'Реюньон', desc_ru: '',
	},
	{
		mask: '+40-##-###-####', cc: 'RO', name_en: 'Romania', desc_en: '', name_ru: 'Румыния', desc_ru: '',
	},
	{
		mask: '+381-##-###-####', cc: 'RS', name_en: 'Serbia', desc_en: '', name_ru: 'Сербия', desc_ru: '',
	},
	{
		mask: '+7(###)###-##-##', cc: 'RU', name_en: 'Russia', desc_en: '', name_ru: 'Россия', desc_ru: '',
	},
	{
		mask: '+250(###)###-###', cc: 'RW', name_en: 'Rwanda', desc_en: '', name_ru: 'Руанда', desc_ru: '',
	},
	{
		mask: '+966-5-####-####', cc: 'SA', name_en: 'Saudi Arabia ', desc_en: 'mobile', name_ru: 'Саудовская Аравия ', desc_ru: 'мобильные',
	},
	{
		mask: '+966-#-###-####', cc: 'SA', name_en: 'Saudi Arabia', desc_en: '', name_ru: 'Саудовская Аравия', desc_ru: '',
	},
	{
		mask: '+677-###-####', cc: 'SB', name_en: 'Solomon Islands ', desc_en: 'mobile', name_ru: 'Соломоновы Острова ', desc_ru: 'мобильные',
	},
	{
		mask: '+677-#####', cc: 'SB', name_en: 'Solomon Islands', desc_en: '', name_ru: 'Соломоновы Острова', desc_ru: '',
	},
	{
		mask: '+248-#-###-###', cc: 'SC', name_en: 'Seychelles', desc_en: '', name_ru: 'Сейшелы', desc_ru: '',
	},
	{
		mask: '+249-##-###-####', cc: 'SD', name_en: 'Sudan', desc_en: '', name_ru: 'Судан', desc_ru: '',
	},
	{
		mask: '+46-##-###-####', cc: 'SE', name_en: 'Sweden', desc_en: '', name_ru: 'Швеция', desc_ru: '',
	},
	{
		mask: '+65-####-####', cc: 'SG', name_en: 'Singapore', desc_en: '', name_ru: 'Сингапур', desc_ru: '',
	},
	{
		mask: '+290-####', cc: 'SH', name_en: 'Saint Helena', desc_en: '', name_ru: 'Остров Святой Елены', desc_ru: '',
	},
	{
		mask: '+290-####', cc: 'SH', name_en: 'Tristan da Cunha', desc_en: '', name_ru: 'Тристан-да-Кунья', desc_ru: '',
	},
	{
		mask: '+386-##-###-###', cc: 'SI', name_en: 'Slovenia', desc_en: '', name_ru: 'Словения', desc_ru: '',
	},
	{
		mask: '+421(###)###-###', cc: 'SK', name_en: 'Slovakia', desc_en: '', name_ru: 'Словакия', desc_ru: '',
	},
	{
		mask: '+232-##-######', cc: 'SL', name_en: 'Sierra Leone', desc_en: '', name_ru: 'Сьерра-Леоне', desc_ru: '',
	},
	{
		mask: '+378-####-######', cc: 'SM', name_en: 'San Marino', desc_en: '', name_ru: 'Сан-Марино', desc_ru: '',
	},
	{
		mask: '+221-##-###-####', cc: 'SN', name_en: 'Senegal', desc_en: '', name_ru: 'Сенегал', desc_ru: '',
	},
	{
		mask: '+252-##-###-###', cc: 'SO', name_en: 'Somalia', desc_en: '', name_ru: 'Сомали', desc_ru: '',
	},
	{
		mask: '+252-#-###-###', cc: 'SO', name_en: 'Somalia', desc_en: '', name_ru: 'Сомали', desc_ru: '',
	},
	{
		mask: '+252-#-###-###', cc: 'SO', name_en: 'Somalia ', desc_en: 'mobile', name_ru: 'Сомали ', desc_ru: 'мобильные',
	},
	{
		mask: '+597-###-####', cc: 'SR', name_en: 'Suriname ', desc_en: 'mobile', name_ru: 'Суринам ', desc_ru: 'мобильные',
	},
	{
		mask: '+597-###-###', cc: 'SR', name_en: 'Suriname', desc_en: '', name_ru: 'Суринам', desc_ru: '',
	},
	{
		mask: '+211-##-###-####', cc: 'SS', name_en: 'South Sudan', desc_en: '', name_ru: 'Южный Судан', desc_ru: '',
	},
	{
		mask: '+239-##-#####', cc: 'ST', name_en: 'Sao Tome and Principe', desc_en: '', name_ru: 'Сан-Томе и Принсипи', desc_ru: '',
	},
	{
		mask: '+503-##-##-####', cc: 'SV', name_en: 'El Salvador', desc_en: '', name_ru: 'Сальвадор', desc_ru: '',
	},
	{
		mask: '+1(721)###-####', cc: 'SX', name_en: 'Sint Maarten', desc_en: '', name_ru: 'Синт-Маартен', desc_ru: '',
	},
	{
		mask: '+963-##-####-###', cc: 'SY', name_en: 'Syrian Arab Republic', desc_en: '', name_ru: 'Сирийская арабская республика', desc_ru: '',
	},
	{
		mask: '+268-##-##-####', cc: 'SZ', name_en: 'Swaziland', desc_en: '', name_ru: 'Свазиленд', desc_ru: '',
	},
	{
		mask: '+1(649)###-####', cc: 'TC', name_en: 'Turks & Caicos', desc_en: '', name_ru: 'Тёркс и Кайкос', desc_ru: '',
	},
	{
		mask: '+235-##-##-##-##', cc: 'TD', name_en: 'Chad', desc_en: '', name_ru: 'Чад', desc_ru: '',
	},
	{
		mask: '+228-##-###-###', cc: 'TG', name_en: 'Togo', desc_en: '', name_ru: 'Того', desc_ru: '',
	},
	{
		mask: '+66-##-###-####', cc: 'TH', name_en: 'Thailand ', desc_en: 'mobile', name_ru: 'Таиланд ', desc_ru: 'мобильные',
	},
	{
		mask: '+66-##-###-###', cc: 'TH', name_en: 'Thailand', desc_en: '', name_ru: 'Таиланд', desc_ru: '',
	},
	{
		mask: '+992-##-###-####', cc: 'TJ', name_en: 'Tajikistan', desc_en: '', name_ru: 'Таджикистан', desc_ru: '',
	},
	{
		mask: '+690-####', cc: 'TK', name_en: 'Tokelau', desc_en: '', name_ru: 'Токелау', desc_ru: '',
	},
	{
		mask: '+670-###-####', cc: 'TL', name_en: 'East Timor', desc_en: '', name_ru: 'Восточный Тимор', desc_ru: '',
	},
	{
		mask: '+670-77#-#####', cc: 'TL', name_en: 'East Timor', desc_en: 'Timor Telecom', name_ru: 'Восточный Тимор', desc_ru: 'Timor Telecom',
	},
	{
		mask: '+670-78#-#####', cc: 'TL', name_en: 'East Timor', desc_en: 'Timor Telecom', name_ru: 'Восточный Тимор', desc_ru: 'Timor Telecom',
	},
	{
		mask: '+993-#-###-####', cc: 'TM', name_en: 'Turkmenistan', desc_en: '', name_ru: 'Туркменистан', desc_ru: '',
	},
	{
		mask: '+216-##-###-###', cc: 'TN', name_en: 'Tunisia', desc_en: '', name_ru: 'Тунис', desc_ru: '',
	},
	{
		mask: '+676-#####', cc: 'TO', name_en: 'Tonga', desc_en: '', name_ru: 'Тонга', desc_ru: '',
	},
	{
		mask: '+90(###)###-####', cc: 'TR', name_en: 'Turkey', desc_en: '', name_ru: 'Турция', desc_ru: '',
	},
	{
		mask: '+1(868)###-####', cc: 'TT', name_en: 'Trinidad & Tobago', desc_en: '', name_ru: 'Тринидад и Тобаго', desc_ru: '',
	},
	{
		mask: '+688-90####', cc: 'TV', name_en: 'Tuvalu ', desc_en: 'mobile', name_ru: 'Тувалу ', desc_ru: 'мобильные',
	},
	{
		mask: '+688-2####', cc: 'TV', name_en: 'Tuvalu', desc_en: '', name_ru: 'Тувалу', desc_ru: '',
	},
	{
		mask: '+886-#-####-####', cc: 'TW', name_en: 'Taiwan', desc_en: '', name_ru: 'Тайвань', desc_ru: '',
	},
	{
		mask: '+886-####-####', cc: 'TW', name_en: 'Taiwan', desc_en: '', name_ru: 'Тайвань', desc_ru: '',
	},
	{
		mask: '+255-##-###-####', cc: 'TZ', name_en: 'Tanzania', desc_en: '', name_ru: 'Танзания', desc_ru: '',
	},
	{
		mask: '+380(##)###-##-##', cc: 'UA', name_en: 'Ukraine', desc_en: '', name_ru: 'Украина', desc_ru: '',
	},
	{
		mask: '+256(###)###-###', cc: 'UG', name_en: 'Uganda', desc_en: '', name_ru: 'Уганда', desc_ru: '',
	},
	{
		mask: '+44-##-####-####', cc: 'UK', name_en: 'United Kingdom', desc_en: '', name_ru: 'Великобритания', desc_ru: '',
	},
	{
		mask: '+598-#-###-##-##', cc: 'UY', name_en: 'Uruguay', desc_en: '', name_ru: 'Уругвай', desc_ru: '',
	},
	{
		mask: '+998-##-###-####', cc: 'UZ', name_en: 'Uzbekistan', desc_en: '', name_ru: 'Узбекистан', desc_ru: '',
	},
	{
		mask: '+39-6-698-#####', cc: 'VA', name_en: 'Vatican City', desc_en: '', name_ru: 'Ватикан', desc_ru: '',
	},
	{
		mask: '+1(784)###-####', cc: 'VC', name_en: 'Saint Vincent & the Grenadines', desc_en: '', name_ru: 'Сент-Винсент и Гренадины', desc_ru: '',
	},
	{
		mask: '+58(###)###-####', cc: 'VE', name_en: 'Venezuela', desc_en: '', name_ru: 'Венесуэла', desc_ru: '',
	},
	{
		mask: '+1(284)###-####', cc: 'VG', name_en: 'British Virgin Islands', desc_en: '', name_ru: 'Британские Виргинские острова', desc_ru: '',
	},
	{
		mask: '+1(340)###-####', cc: 'VI', name_en: 'US Virgin Islands', desc_en: '', name_ru: 'Американские Виргинские острова', desc_ru: '',
	},
	{
		mask: '+84-##-####-###', cc: 'VN', name_en: 'Vietnam', desc_en: '', name_ru: 'Вьетнам', desc_ru: '',
	},
	{
		mask: '+84(###)####-###', cc: 'VN', name_en: 'Vietnam', desc_en: '', name_ru: 'Вьетнам', desc_ru: '',
	},
	{
		mask: '+678-##-#####', cc: 'VU', name_en: 'Vanuatu ', desc_en: 'mobile', name_ru: 'Вануату ', desc_ru: 'мобильные',
	},
	{
		mask: '+678-#####', cc: 'VU', name_en: 'Vanuatu', desc_en: '', name_ru: 'Вануату', desc_ru: '',
	},
	{
		mask: '+681-##-####', cc: 'WF', name_en: 'Wallis and Futuna', desc_en: '', name_ru: 'Уоллис и Футуна', desc_ru: '',
	},
	{
		mask: '+685-##-####', cc: 'WS', name_en: 'Samoa', desc_en: '', name_ru: 'Самоа', desc_ru: '',
	},
	{
		mask: '+967-###-###-###', cc: 'YE', name_en: 'Yemen ', desc_en: 'mobile', name_ru: 'Йемен ', desc_ru: 'мобильные',
	},
	{
		mask: '+967-#-###-###', cc: 'YE', name_en: 'Yemen', desc_en: '', name_ru: 'Йемен', desc_ru: '',
	},
	{
		mask: '+967-##-###-###', cc: 'YE', name_en: 'Yemen', desc_en: '', name_ru: 'Йемен', desc_ru: '',
	},
	{
		mask: '+27-##-###-####', cc: 'ZA', name_en: 'South Africa', desc_en: '', name_ru: 'Южно-Африканская Респ.', desc_ru: '',
	},
	{
		mask: '+260-##-###-####', cc: 'ZM', name_en: 'Zambia', desc_en: '', name_ru: 'Замбия', desc_ru: '',
	},
	{
		mask: '+263-#-######', cc: 'ZW', name_en: 'Zimbabwe', desc_en: '', name_ru: 'Зимбабве', desc_ru: '',
	},
	{
		mask: '+1(###)###-####', cc: ['US', 'CA'], name_en: 'USA and Canada', desc_en: '', name_ru: 'США и Канада', desc_ru: '',
	},
	{
		mask: '8(###)###-##-##', cc: 'RU', name_en: 'Russia', desc_en: '', name_ru: 'Россия', desc_ru: '',
	},
];


const extension = {
	defaultEmail: '',
	defaultNumber: '',
	defaultMobileNumber: '',
	$number: $('#number'),
	$sip_secret: $('#sip_secret'),
	$mobile_number: $('#mobile_number'),
	$fwd_forwarding: $('#fwd_forwarding'),
	$fwd_forwardingonbusy: $('#fwd_forwardingonbusy'),
	$fwd_forwardingonunavailable: $('#fwd_forwardingonunavailable'),
	$email: $('#user_email'),
	$formObj: $('#extensions-form'),
	validateRules: {
		number: {
			identifier: 'number',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateNumberIsEmpty,
				},
				{
					type: 'existRule[number-error]',
					prompt: globalTranslate.ex_ValidateNumberIsDouble,
				},
			],
		},
		mobile_number: {
			optional: true,
			identifier: 'mobile_number',
			rules: [
				{
					type: 'mask',
					prompt: globalTranslate.ex_ValidateMobileIsNotCorrect,
				},
				{
					type: 'existRule[mobile-number-error]',
					prompt: globalTranslate.ex_ValidateMobileNumberIsDouble,
				},
			],
		},
		user_email: {
			optional: true,
			identifier: 'user_email',
			rules: [
				{
					type: 'email',
					prompt: globalTranslate.ex_ValidateEmailEmpty,
				},
			],
		},
		user_username: {
			identifier: 'user_username',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateUsernameEmpty,
				},
			],
		},
		sip_secret: {
			identifier: 'sip_secret',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateSecretEmpty,
				},
			],
		},
		fwd_ringlength: {
			identifier: 'fwd_ringlength',
			optional: true,
			rules: [
				{
					type: 'integer[10..180]',
					prompt: globalTranslate.ex_ValidateRingingBeforeForwardOutOfRange,
				},
			],
		},
		fwd_forwarding: {
			depends: 'fwd_ringlength',
			identifier: 'fwd_forwarding',
			rules: [
				{
					type: 'extensionRule',
					prompt: globalTranslate.ex_ValidateForwardingToBeFilled,
				},
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},
		fwd_forwardingonbusy: {
			identifier: 'fwd_forwardingonbusy',
			rules: [
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},
		fwd_forwardingonunavailable: {
			identifier: 'fwd_forwardingonunavailable',
			rules: [
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},

	},
	initialize() {
		extension.defaultEmail = extension.$email.inputmask('unmaskedvalue');
		extension.defaultMobileNumber = extension.$mobile_number.inputmask('unmaskedvalue');
		extension.defaultNumber = extension.$number.inputmask('unmaskedvalue');

		$('#extensions-menu .item').tab();
		$('.codecs').checkbox();
		$('.ui.accordion').accordion();
		$('.dropdown').dropdown();

		$('#qualify').checkbox({
			onChange() {
				if ($('#qualify').checkbox('is checked')) {
					$('#qualify-freq').removeClass('disabled');
				} else {
					$('#qualify-freq').addClass('disabled');
				}
			},
		});

		$('.forwarding-select').dropdown(Extensions.getDropdownSettingsWithEmpty());
		Extensions.fixBugDropdownIcon();

		if ($('#sip_secret').val() === '') extension.generateNewSipPassword();

		$('#generate-new-password').on('click', (e) => {
			e.preventDefault();
			extension.generateNewSipPassword();
			extension.$sip_secret.trigger('change');
		});

		extension.$number.inputmask('option', {
			oncomplete: extension.cbOnCompleteNumber,
		});

		const maskList = $.masksSort(maskListUnsorted, ['#'], /[0-9]|#/, 'mask');
		extension.$mobile_number.inputmasks({
			inputmask: {
				definitions: {
					'#': {
						validator: '[0-9]',
						cardinality: 1,
					},
				},
				showMaskOnHover: false,
				oncleared: extension.cbOnClearedMobileNumber,
				oncomplete: extension.cbOnCompleteMobileNumber,
				// clearIncomplete: true,
			},
			match: /[0-9]/,
			replace: '9',
			list: maskList,
			listKey: 'mask',
		});
		extension.$email.inputmask('email', {
			onUnMask: extension.cbOnUnmaskEmail,
			oncomplete: extension.cbOnCompleteEmail,
		});

		extension.initializeForm();
	},

	/**
	 * Вызывается после воода номера телефона для проверки нет ли пересечений с
	 * существующими номерами
	 */
	cbOnCompleteNumber() {
		const newNumber = extension.$number.inputmask('unmaskedvalue');
		const userId = extension.$formObj.form('get value', 'user_id');
		Extensions.checkAvailability(extension.defaultNumber, newNumber, 'number', userId);
	},
	/**
	 * Вызывается после ввода полного Email адреса
	 */
	cbOnCompleteEmail() {
		// Динамическая прововерка свободен ли Email
		$.api({
			url: `${globalRootUrl}users/available/{value}`,
			stateContext: '.ui.input.email',
			on: 'now',
			beforeSend(settings) {
				const result = settings;
				result.urlData = {
					value: extension.$email.inputmask('unmaskedvalue'),
				};
				return result;
			},
			onSuccess(response) {
				if (response.emailAvailable
					|| extension.defaultEmail === extension.$email.inputmask('unmaskedvalue')
				) {
					$('.ui.input.email').parent().removeClass('error');
					$('#email-error').addClass('hidden');
				} else {
					$('.ui.input.email').parent().addClass('error');
					$('#email-error').removeClass('hidden');
				}
			},
		});
	},
	/**
	 * Вызывается при получении безмасочного значения
	 */
	cbOnUnmaskEmail(maskedValue, unmaskedValue) {
		return unmaskedValue;
	},
	/**
	 * Вызывается при вводе мобильного телефона в карточке сотрудника
	 */
	cbOnCompleteMobileNumber() {
		const newMobileNumber = extension.$mobile_number.inputmask('unmaskedvalue');
		const userId = extension.$formObj.form('get value', 'user_id');
		// Динамическая прововерка свободен ли выбранный мобильный номер
		Extensions.checkAvailability(extension.defaultMobileNumber, newMobileNumber, 'mobile-number', userId);

		// Перезаполним строку донабора
		if (newMobileNumber !== extension.defaultMobileNumber
			|| (extension.$formObj.form('get value', 'mobile_dialstring').length === 0)
		) {
			extension.$formObj.form('set value', 'mobile_dialstring', newMobileNumber);
		}

		// Проверим не менялся ли мобильный номер
		if (newMobileNumber !== extension.defaultMobileNumber) {
			const userName = extension.$formObj.form('get value', 'user_username');
			// Проверим не была ли настроена переадресация на мобильный номер
			if (extension.$formObj.form('get value', 'fwd_forwarding') === extension.defaultMobileNumber) {
				if (extension.$formObj.form('get value', 'fwd_ringlength').length === 0) {
					extension.$formObj.form('set value', 'fwd_ringlength', 45);
				}
				extension.$fwd_forwarding
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwarding', newMobileNumber);
			}
			if (extension.$formObj.form('get value', 'fwd_forwardingonbusy') === extension.defaultMobileNumber) {
				extension.$fwd_forwardingonbusy
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwardingonbusy', newMobileNumber);
			}
			if (extension.$formObj.form('get value', 'fwd_forwardingonunavailable') === extension.defaultMobileNumber) {
				extension.$fwd_forwardingonunavailable
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwardingonunavailable', newMobileNumber);
			}
		}
		extension.defaultMobileNumber = newMobileNumber;
		console.log(`new mobile number ${extension.defaultMobileNumber} `);
	},
	/**
	 * Вызывается при очистке мобильного телефона в карточке сотрудника
	 */
	cbOnClearedMobileNumber() {
		extension.$formObj.form('set value', 'mobile_dialstring', '');


		// Проверим не была ли настроена переадресация на мобильный номер
		if (extension.$formObj.form('get value', 'fwd_forwarding') === extension.defaultMobileNumber) {
			extension.$formObj.form('set value', 'fwd_ringlength', '');

			extension.$fwd_forwarding
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwarding', -1);
		}
		if (extension.$formObj.form('get value', 'fwd_forwardingonbusy') === extension.defaultMobileNumber) {
			extension.$fwd_forwardingonbusy
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwardingonbusy', -1);
		}
		if (extension.$formObj.form('get value', 'fwd_forwardingonunavailable') === extension.defaultMobileNumber) {
			extension.$fwd_forwardingonunavailable
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwardingonunavailable', -1);
		}
		extension.defaultMobileNumber = '';
	},

	/**
	 * generateNewSipPassword() Работа с паролем SIP учетки
	 */
	generateNewSipPassword() {
		const chars = 'abcdef1234567890';
		let pass = '';
		for (let x = 0; x < 32; x += 1) {
			const i = Math.floor(Math.random() * chars.length);
			pass += chars.charAt(i);
		}
		extension.$sip_secret.val(pass);
	},
	cbBeforeSendForm(settings) {
		const result = settings;
		result.data = extension.$formObj.form('get values');
		result.data.mobile_number = extension.$mobile_number.inputmask('unmaskedvalue');
		return result;
	},
	cbAfterSendForm() {
		extension.defaultNumber = extension.$number.val();
	},
	initializeForm() {
		Form.$formObj = extension.$formObj;
		Form.url = `${globalRootUrl}extensions/save`;
		Form.validateRules = extension.validateRules;
		Form.cbBeforeSendForm = extension.cbBeforeSendForm;
		Form.cbAfterSendForm = extension.cbAfterSendForm;
		Form.initialize();
	},
};

const avatar = {
	$picture: $('#avatar'),
	initialize() {
		if (avatar.$picture.attr('src') === '') {
			avatar.$picture.attr('src', `${globalRootUrl}public/img/unknownPerson.jpg`);
		}
		$('#upload-new-avatar').on('click', () => {
			$('#file-select').click();
		});

		$('#clear-avatar').on('click', () => {
			avatar.$picture.attr('src', `${globalRootUrl}public/img/unknownPerson.jpg`);
			extension.$formObj.form('set value', 'user_avatar', null);
		});

		$('#file-select').on('change', (e) => {
			let image;
			e.preventDefault();
			const dataTransfer = 'dataTransfer' in e ? e.dataTransfer.files : [];
			const images = 'files' in e.target ? e.target.files : dataTransfer;
			if (images && images.length) {
				Array.from(images).forEach((curImage) => {
					if (typeof curImage !== 'object') return;
					image = new Image();
					image.src = avatar.createObjectURL(curImage);
					image.onload = (event) => {
						const args = {
							src: event.target,
							width: 200,
							height: 200,
							type: 'image/png',
							compress: 90,
						};
						const mybase64resized = avatar.resizeCrop(args);
						avatar.$picture.attr('src', mybase64resized);
						extension.$formObj.form('set value', 'user_avatar', mybase64resized);
					};
				});
			}
		});
	},
	resizeCrop({
		src, width, height, type, compress,
	}) {
		let newWidth = width;
		let newHeight = height;
		const crop = newWidth === 0 || newHeight === 0;
		// not resize
		if (src.width <= newWidth && newHeight === 0) {
			newWidth = src.width;
			newHeight = src.height;
		}
		// resize
		if (src.width > newWidth && newHeight === 0) {
			newHeight = src.height * (newWidth / src.width);
		}
		// check scale
		const xscale = newWidth / src.width;
		const yscale = newHeight / src.height;
		const scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
		// create empty canvas
		const canvas = document.createElement('canvas');
		canvas.width = newWidth || Math.round(src.width * scale);
		canvas.height = newHeight || Math.round(src.height * scale);
		canvas.getContext('2d').scale(scale, scale);
		// crop it top center
		canvas.getContext('2d').drawImage(src, ((src.width * scale) - canvas.width) * -0.5, ((src.height * scale) - canvas.height) * -0.5);
		return canvas.toDataURL(type, compress);
	},
	createObjectURL(i) {
		const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		return URL.createObjectURL(i);
	},

};


const extensionStatusLoopWorker = {
	timeOut: 3000,
	timeOutHandle: '',
	$statusLabel: $('#status'),
	/**
	 * initialize() создание объектов и запуск их
	 */
	initialize() {
		DebuggerInfo.initialize();
		extensionStatusLoopWorker.restartWorker();
	},
	restartWorker() {
		window.clearTimeout(extensionStatusLoopWorker.timeoutHandle);
		extensionStatusLoopWorker.worker();
	},
	worker() {
		if (extension.defaultNumber.length === 0) return;
		const param = { peer: extension.defaultNumber };
		window.clearTimeout(extensionStatusLoopWorker.timeoutHandle);
		PbxApi.GetPeerStatus(param, extensionStatusLoopWorker.cbRefreshExtensionStatus);
	},
	/**
	 * cbRefreshExtensionStatus() Обновление статусов пира
	 */
	cbRefreshExtensionStatus(response) {
		extensionStatusLoopWorker.timeoutHandle =
			window.setTimeout(extensionStatusLoopWorker.worker, extensionStatusLoopWorker.timeOut);
		if (response.length === 0 || response === false) return;
		const $status = extensionStatusLoopWorker.$statusLabel;

		let htmlTable = '<table class="ui very compact table">';
		$.each(response, (key, value) => {
			htmlTable += '<tr>';
			htmlTable += `<td>${key}</td>`;
			htmlTable += `<td>${value}</td>`;
			htmlTable += '</tr>';
		});
		htmlTable += '</table>';
		DebuggerInfo.UpdateContent(htmlTable);

		if ('Status' in response && response.Status.toUpperCase().indexOf('OK') >= 0) {
			$status.removeClass('grey').addClass('green');
		} else {
			$status.removeClass('green').addClass('grey');
		}
		if ($status.hasClass('green')) {
			$status.html(globalTranslate.ex_Online);
		} else {
			$status.html(globalTranslate.ex_Offline);
		}
	},
};

// Если выбран вариант переадресации на номер, а сам номер не выбран
$.fn.form.settings.rules.extensionRule = () => {
	const fwdRingLength = extension.$formObj.form('get value', 'fwd_ringlength');
	const fwdForwarding = extension.$formObj.form('get value', 'fwd_forwarding');
	if ((fwdRingLength > 0) &&
		(parseInt(fwdForwarding, 10) === -1 || fwdForwarding === '')) {
		return false;
	}
	return true;
};

// Проверка нет ли ошибки занятого другой учеткой номера
$.fn.form.settings.rules.existRule = (value, parameter) => $(`#${parameter}`).hasClass('hidden');

$(document).ready(() => {
	extension.initialize();
	avatar.initialize();
	extensionStatusLoopWorker.initialize();
});