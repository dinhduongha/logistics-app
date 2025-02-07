﻿using System.Globalization;
using Microsoft.AspNetCore.Components;

namespace Logistics.AdminApp.Shared;

public partial class CurrencyText
{
    private string FormattedValue => FormatValueAsCurrency(Value);
    
    [Parameter] 
    public decimal Value { get; set; }
    
    [Parameter] 
    public string Culture { get; set; } = "en-US";
    
    [Parameter]
    public string CurrencySymbol { get; set; } = "$";
    
    [Parameter]
    public int DecimalPlaces { get; set; } = 2;

    private string FormatValueAsCurrency(decimal value)
    {
        var cultureInfo = new CultureInfo(Culture);
        var numberFormat = cultureInfo.NumberFormat;
        numberFormat.CurrencySymbol = CurrencySymbol;
        numberFormat.CurrencyDecimalDigits = DecimalPlaces;
        return value.ToString("C", cultureInfo);
    }
}
